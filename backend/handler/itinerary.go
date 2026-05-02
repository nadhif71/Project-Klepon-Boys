package handler

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type ItineraryHandler struct {
	itineraryService *service.ItineraryService
}

func NewItineraryHandler(itineraryService *service.ItineraryService) *ItineraryHandler {
	return &ItineraryHandler{itineraryService: itineraryService}
}

func (h *ItineraryHandler) CreateItinerary(c *gin.Context) {
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

	params := service.ItineraryDB{
		TicketID:           dbItinerary.TicketID,
		HotelID:            dbItinerary.HotelID,
		TransportToVenue:   dbItinerary.TransportToVenue,
		TransportFromVenue: dbItinerary.TransportFromVenue,
	}

	itinerary, err := h.itineraryService.CreateItinerary(c, userID, params)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Theres a mistake at database inputting"})
		return
	}

	c.JSON(http.StatusOK, itinerary)
}

func (h *ItineraryHandler) UserItineraries(c *gin.Context) {

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

	userItenerary, err := h.itineraryService.GetUserItineraries(c, userID)
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
