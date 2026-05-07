package service

import (
	"context"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type VenueService struct {
	db *db.Queries
}

func NewVenueService(db *db.Queries) *VenueService {
	return &VenueService{db: db}
}

func (s *VenueService) ListVenues(ctx context.Context) ([]db.Venue, error) {
	return s.db.ListVenues(ctx)
}

func (s *VenueService) GetVenue(ctx context.Context, id int) (db.Venue, error) {
	return s.db.GetVenue(ctx, int32(id))
}
