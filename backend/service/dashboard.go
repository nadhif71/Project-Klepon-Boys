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
	if err != nil {
		return nil, err
	}

	// Deduplicate rows by TicketOrderID.
	// The LEFT JOINs on hotel_bookings and intercity_transports can produce
	// a cartesian product when a user has multiple bookings/transports.
	// We keep the first occurrence per ticket_order_id.
	seen := make(map[int32]bool)
	deduped := make([]db.GetUserDashboardRow, 0, len(res))
	for _, row := range res {
		if seen[row.TicketOrderID] {
			continue
		}
		seen[row.TicketOrderID] = true
		deduped = append(deduped, row)
	}

	return deduped, nil
}
