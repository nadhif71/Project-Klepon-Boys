package service

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/nadhif71/Project-Klepon-Boys/db"
	"golang.org/x/crypto/bcrypt"
)

type Claims struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

type AuthService struct {
	db        *db.Queries
	jwtSecret []byte
}

func NewAuthService(db *db.Queries, jwtSecret []byte) *AuthService {
	return &AuthService{
		db:        db,
		jwtSecret: jwtSecret,
	}
}

func (s *AuthService) Login(ctx context.Context, email, password string) (string, db.GetUserByEmailRow, error) {
	user, err := s.db.GetUserByEmail(ctx, email)
	if err != nil {
		return "", db.GetUserByEmailRow{}, fmt.Errorf("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", db.GetUserByEmailRow{}, fmt.Errorf("invalid credentials")
	}

	token, err := s.GenerateToken(user.ID.String(), user.Email, user.Role)
	if err != nil {
		return "", db.GetUserByEmailRow{}, fmt.Errorf("failed to generate token")
	}

	return token, user, nil
}

func (s *AuthService) Register(ctx context.Context, email, password, role, firstName, lastName string) (string, db.CreateUserRow, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", db.CreateUserRow{}, fmt.Errorf("failed to hash password")
	}

	user, err := s.db.CreateUser(ctx, db.CreateUserParams{
		Email:     email,
		Password:  string(hashedPassword),
		Role:      role,
		FirstName: firstName,
		LastName:  lastName,
	})
	if err != nil {
		return "", db.CreateUserRow{}, fmt.Errorf("user already exists")
	}

	token, err := s.GenerateToken(user.ID.String(), user.Email, user.Role)
	if err != nil {
		return "", db.CreateUserRow{}, fmt.Errorf("failed to generate token")
	}

	return token, user, nil
}

func (s *AuthService) ForgotPassword(ctx context.Context, email string) (string, error) {
	_, err := s.db.GetUserByEmail(ctx, email)
	if err != nil {
		return "", fmt.Errorf("email not found")
	}

	tokenBytes := make([]byte, 32)
	_, err = rand.Read(tokenBytes)
	if err != nil {
		return "", fmt.Errorf("failed to generate token")
	}
	resetToken := hex.EncodeToString(tokenBytes)

	expiry := time.Now().Add(1 * time.Hour)

	err = s.db.UpdateUserResetToken(ctx, db.UpdateUserResetTokenParams{
		Email:            email,
		ResetToken:       sql.NullString{String: resetToken, Valid: true},
		ResetTokenExpiry: sql.NullTime{Time: expiry, Valid: true},
	})
	if err != nil {
		return "", fmt.Errorf("failed to store reset token")
	}

	return resetToken, nil
}

func (s *AuthService) ResetPassword(ctx context.Context, token, newPassword string) error {
	user, err := s.db.GetUserByResetToken(ctx, sql.NullString{String: token, Valid: true})
	if err != nil {
		return fmt.Errorf("invalid or expired reset token")
	}

	if !user.ResetTokenExpiry.Valid || time.Now().After(user.ResetTokenExpiry.Time) {
		return fmt.Errorf("reset token has expired")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password")
	}

	err = s.db.UpdateUserPassword(ctx, db.UpdateUserPasswordParams{
		ID:       user.ID,
		Password: string(hashedPassword),
	})
	if err != nil {
		return fmt.Errorf("failed to update password")
	}

	return nil
}

// Generate JWT token
func (s *AuthService) GenerateToken(userID, email, role string) (string, error) {
	claims := Claims{
		UserID: userID,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "jokowi",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.jwtSecret)
}

func (s *AuthService) ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return s.jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return nil, fmt.Errorf("invalid or expired token")
	}

	return claims, nil
}
