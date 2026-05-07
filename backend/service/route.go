package service

import (
	"context"
	"database/sql"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type RouteService struct {
	db *db.Queries
}

func NewRouteService(db *db.Queries) *RouteService {
	return &RouteService{
		db: db,
	}
}

func (s *RouteService) GetRoutesForVenue(ctx context.Context, dest_id int) ([]db.GetRoutesForVenueRow, error) {
	destId := sql.NullInt32{Int32: int32(dest_id), Valid: true}
	res, err := s.db.GetRoutesForVenue(ctx, destId)
	return res, err
}
