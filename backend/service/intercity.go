package service

import (
	"context"
	"database/sql"
	"time"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type IntercityService struct {
	db *db.Queries
}

func NewIntercityService(db *db.Queries) *IntercityService {
	return &IntercityService{
		db: db,
	}
}

type IntercityRequest struct {
	OriginCity    string    `json:"origin_city" binding:"required"`
	TransportMode string    `json:"transport_mode" binding:"required"`
	DepartureDate time.Time `json:"departure_date" binding:"required"`
	ReturnDate    time.Time `json:"return_date"`
	Status        string    `json:"status"`
}

func (s *IntercityService) CreateIntercityTransport(ctx context.Context, origin, mode, status string, depart_date, return_date time.Time, user_id any) (db.CreateIntercityTransportRow, error) {
	userId, err := StringToNullUUID(user_id)
	if err != nil {
		return db.CreateIntercityTransportRow{}, err
	}

	returnDate := sql.NullTime{Time: return_date, Valid: true}

	params := db.CreateIntercityTransportParams{
		UserID:        userId,
		OriginCity:    origin,
		TransportMode: mode,
		DepartureDate: depart_date,
		ReturnDate:    returnDate,
		Status:        status,
	}
	res, err := s.db.CreateIntercityTransport(ctx, params)
	return res, err
}

func (s *IntercityService) GetIntercityTransportByUser(ctx context.Context, user_id any) ([]db.GetIntercityTransportsByUserRow, error) {
	userId, err := StringToNullUUID(user_id)
	if err != nil {
		return nil, err
	}
	res, err := s.db.GetIntercityTransportsByUser(ctx, userId)
	return res, err
}
