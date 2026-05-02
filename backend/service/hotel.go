package service

import (
	"context"
	"database/sql"
	"time"

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

type HotelBookingRequest struct {
	HotelID      int       `json:"hotel_id" binding:"required"`
	CheckInDate  time.Time `json:"check_in_date" binding:"required"`
	CheckOutDate time.Time `json:"check_out_date" binding:"required"`
	Status       string    `json:"status"`
}

func (s *HotelService) HotelList(ctx context.Context) ([]db.Hotel, error) {
	res, err := s.db.ListHotels(ctx)
	return res, err
}

func (s *HotelService) GetHotel(ctx context.Context, id int) (db.Hotel, error) {
	res, err := s.db.GetHotel(ctx, int32(id))
	return res, err
}

func (s *HotelService) CreateHotelBooking(ctx context.Context, user_id any, hotel_id int, check_in, check_out time.Time, status string) (db.CreateHotelBookingRow, error) {
	userId, err := StringToNullUUID(user_id)
	if err != nil {
		return db.CreateHotelBookingRow{}, err
	}

	hotelId := sql.NullInt32{Int32: int32(hotel_id), Valid: true}

	params := db.CreateHotelBookingParams{
		UserID:       userId,
		HotelID:      hotelId,
		CheckInDate:  check_in,
		CheckOutDate: check_out,
		Status:       status,
	}

	res, err := s.db.CreateHotelBooking(ctx, params)
	return res, err
}

func (s *HotelService) GetHotelBookingsByUser(ctx context.Context, user_id any) ([]db.GetHotelBookingsByUserRow, error) {
	userId, err := StringToNullUUID(user_id)
	if err != nil {
		return nil, err
	}
	res, err := s.db.GetHotelBookingsByUser(ctx, userId)
	return res, err
}
