package service

import (
	"context"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type TransportService struct {
	db *db.Queries
}

func NewTransportService(db *db.Queries) *TransportService {
	return &TransportService{db: db}
}

func (s *TransportService) ListCities(ctx context.Context) ([]db.City, error) {
	return s.db.ListCities(ctx)
}

func (s *TransportService) GetCity(ctx context.Context, id int) (db.City, error) {
	return s.db.GetCity(ctx, int32(id))
}

func (s *TransportService) GetCityHubs(ctx context.Context, cityID int) ([]db.CityHub, error) {
	return s.db.GetCityHubs(ctx, int32(cityID))
}

func (s *TransportService) ListTransportOptions(ctx context.Context, originHubID, destHubID int) ([]db.ListTransportOptionsRow, error) {
	return s.db.ListTransportOptions(ctx, db.ListTransportOptionsParams{
		Column1: int32(originHubID),
		Column2: int32(destHubID),
	})
}
