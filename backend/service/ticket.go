package service

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/google/uuid"
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

type TicketOrderRequest struct {
	TicketID int    `json:"ticket_id" binding:"required"`
	Quantity int    `json:"quantity" binding:"required"`
	Status   string `json:"status"`
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

func (s *TiketService) CreateTicketOrder(ctx context.Context, user_id any, ticket_id, quantity int, status string) (db.CreateTicketOrderRow, error) {
	userId, err := StringToNullUUID(user_id)
	if err != nil {
		return db.CreateTicketOrderRow{}, err
	}

	ticketId := sql.NullInt32{Int32: int32(ticket_id), Valid: true}
	req := db.CreateTicketOrderParams{
		UserID:   userId,
		TicketID: ticketId,
		Quantity: int32(quantity),
		Status:   status,
	}
	res, err := s.db.CreateTicketOrder(ctx, req)
	return res, err
}

func (s *TiketService) GetTicketOrdersByUser(ctx context.Context, user_id any) ([]db.GetTicketOrdersByUserRow, error) {
	userId, err := StringToNullUUID(user_id)
	if err != nil {
		return nil, err
	}

	res, err := s.db.GetTicketOrdersByUser(ctx, userId)
	return res, err
}

func StringToNullUUID(userIDInterface any) (uuid.NullUUID, error) {
	userIDStr, ok := userIDInterface.(string)
	if !ok {
		return uuid.NullUUID{}, fmt.Errorf("stringToNullUUID: expected string, got %T", userIDInterface)
	}

	parsedUUID, err := uuid.Parse(userIDStr)
	if err != nil {
		return uuid.NullUUID{}, err
	}

	userID := uuid.NullUUID{
		UUID:  parsedUUID,
		Valid: true,
	}

	return userID, nil
}
