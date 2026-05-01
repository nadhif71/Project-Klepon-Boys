package service

import (
	"database/sql"
	"log"

	"github.com/google/uuid"
)

type ItineraryRequest struct {
	ConcertID          int  `json:"concert_id" binding:"required"`
	HotelID            *int `json:"hotel_id"` // optional fields
	TransportToVenue   *int `json:"transport_to_venue"`
	TransportFromVenue *int `json:"transport_from_venue"`
}

type ItineraryDB struct {
	ConcertID          sql.NullInt32
	HotelID            sql.NullInt32
	TransportToVenue   sql.NullInt32
	TransportFromVenue sql.NullInt32
}

func ConvertToNullInt32(req *ItineraryRequest) ItineraryDB {
	return ItineraryDB{
		ConcertID: sql.NullInt32{
			Int32: int32(req.ConcertID),
			Valid: true, // concert_id is required, so always valid
		},
		HotelID:            intPtrToNullInt32(req.HotelID),
		TransportToVenue:   intPtrToNullInt32(req.TransportToVenue),
		TransportFromVenue: intPtrToNullInt32(req.TransportFromVenue),
	}
}

func intPtrToNullInt32(ptr *int) sql.NullInt32 {
	if ptr == nil {
		return sql.NullInt32{Valid: false}
	}
	return sql.NullInt32{
		Int32: int32(*ptr),
		Valid: true,
	}
}

func StringToNullUUID(userIDInterface any) (uuid.NullUUID, error) {
	userIDStr, ok := userIDInterface.(string)
	if !ok {
		log.Fatal("Invalid user id type")
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
