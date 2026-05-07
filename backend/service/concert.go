package service

import (
	"context"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type ConcertService struct {
	db *db.Queries
}

func NewConcertService(db *db.Queries) *ConcertService {
	return &ConcertService{
		db: db,
	}
}

func (s *ConcertService) ListUpcomingConcerts(ctx context.Context) ([]db.ListUpcomingConcertsRow, error) {
	res, err := s.db.ListUpcomingConcerts(ctx)
	return res, err
}

func (s *ConcertService) ConcertsById(ctx context.Context, id int) (db.Concert, error) {
	res, err := s.db.GetConcert(ctx, int32(id))
	return res, err
}

func (s *ConcertService) CreateConcert(ctx context.Context, arg db.CreateConcertParams) (db.Concert, error) {
	return s.db.CreateConcert(ctx, arg)
}
