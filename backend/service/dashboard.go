package service

import (
	"context"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type DashboardService struct {
	db *db.Queries
}

func NewDashboardService(db *db.Queries) *DashboardService {
	return &DashboardService{
		db: db,
	}
}

func (s *DashboardService) GetUserDashboard(ctx context.Context, user_id any) ([]db.GetUserDashboardRow, error) {
	userId, err := StringToNullUUID(user_id)
	if err != nil {
		return nil, err
	}

	res, err := s.db.GetUserDashboard(ctx, userId)
	return res, err
}
