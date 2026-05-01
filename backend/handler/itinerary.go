package handler

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/db"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

func (s *Server) CreateItinerary(c *gin.Context) {
	var req service.ItineraryRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dbItinerary := service.ConvertToNullInt32(&req)

	userIDInterface, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context, login first!"})
		return
	}

	userID, err := service.StringToNullUUID(userIDInterface)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}
	itinerary, err := s.queries.CreateItinerary(c, db.CreateItineraryParams{
		UserID:             userID,
		ConcertID:          dbItinerary.ConcertID,
		HotelID:            dbItinerary.HotelID,
		TransportToVenue:   dbItinerary.TransportToVenue,
		TransportFromVenue: dbItinerary.TransportFromVenue,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Theres a mistake at database inputting"})
		return
	}

	c.JSON(http.StatusOK, itinerary)
}

func (s *Server) UserItineraries(c *gin.Context) {

	userIDInterface, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in context"})
		return
	}

	userID, err := service.StringToNullUUID(userIDInterface)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	userItenerary, err := s.queries.GetUserItineraries(c, userID)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusOK, userItenerary)
}
