package service

import (
	"context"
	"database/sql"

	"github.com/nadhif71/Project-Klepon-Boys/db"
)

type TiketService struct {
	db *db.Queries
}

func NewTiketService(db *db.Queries) *TiketService {
	return &TiketService{
		db: db,
	}
}

type StockUpdateRequest struct {
	Stock int `json:"stock" binding:"required"`
}

func (s *TiketService) TicketsForConcert(ctx context.Context, concert_id int32) ([]db.Ticket, error) {
	concertId := sql.NullInt32{Int32: concert_id, Valid: true}
	res, err := s.db.GetTicketsForConcert(ctx, concertId)
	return res, err
}

func (s *TiketService) UpdateTicketStock(ctx context.Context, ticket_id, amount int32) (db.UpdateTicketStockRow, error) {
	params := db.UpdateTicketStockParams{ID: ticket_id, Stock: amount}
	res, err := s.db.UpdateTicketStock(ctx, params)
	return res, err
}
