package service

import (
	"context"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type HotelService struct {
	db *db.Queries
}

func NewHotelServices(db *db.Queries) *HotelService {
	return &HotelService{
		db: db,
	}
}

func (s *HotelService) HotelList(ctx context.Context) ([]db.Hotel, error) {
	res, err := s.db.ListHotels(ctx)
	return res, err
}
