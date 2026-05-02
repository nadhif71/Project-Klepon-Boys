package service

import (
	"context"
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

func (s *AuthService) Login(ctx context.Context, email, password string) (string, db.User, error) {
	user, err := s.db.GetUserByEmail(ctx, email)
	if err != nil {
		return "", db.User{}, fmt.Errorf("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", db.User{}, fmt.Errorf("invalid credentials")
	}

	token, err := s.GenerateToken(user.ID.String(), user.Email, user.Role)
	if err != nil {
		return "", db.User{}, fmt.Errorf("failed to generate token")
	}

	return token, user, nil
}

func (s *AuthService) Register(ctx context.Context, email, password, role string) (string, db.User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", db.User{}, fmt.Errorf("failed to hash password")
	}

	user, err := s.db.CreateUser(ctx, db.CreateUserParams{
		Email:    email,
		Password: string(hashedPassword),
		Role:     role,
	})
	if err != nil {
		return "", db.User{}, fmt.Errorf("user already exists")
	}

	token, err := s.GenerateToken(user.ID.String(), user.Email, user.Role)
	if err != nil {
		return "", db.User{}, fmt.Errorf("failed to generate token")
	}

	return token, db.User{
		ID:        user.ID,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
	}, nil
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
