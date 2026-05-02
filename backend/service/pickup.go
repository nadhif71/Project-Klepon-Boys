package service

import (
	"context"
	"database/sql"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type PickupService struct {
	db *db.Queries
}

func NewPickupService(db *db.Queries) *PickupService {
	return &PickupService{
		db: db,
	}
}

type CrowdChekinRequest struct {
	PickupPointId int `json:"pickup_point_id" binding:"required"`
}

func (s *PickupService) ListPickupPointsForVenue(ctx context.Context, venue_id int) ([]db.ListPickupPointsForVenueRow, error) {
	venueId := sql.NullInt32{Int32: int32(venue_id), Valid: true}
	res, err := s.db.ListPickupPointsForVenue(ctx, venueId)
	return res, err
}

func (s *PickupService) CreateCrowdCheckin(ctx context.Context, user_id any, pickup_point_id int) (db.CreateCrowdCheckinRow, error) {
	userId, err := StringToNullUUID(user_id)
	if err != nil {
		return db.CreateCrowdCheckinRow{}, err
	}

	pickupPointId := sql.NullInt32{Int32: int32(pickup_point_id), Valid: true}

	params := db.CreateCrowdCheckinParams{
		UserID:        userId,
		PickupPointID: pickupPointId,
	}
	res, err := s.db.CreateCrowdCheckin(ctx, params)
	return res, err
}
