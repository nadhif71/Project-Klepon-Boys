package handler

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/db"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type ConcertHandler struct {
	concertService *service.ConcertService
}

func NewConcertHandler(concertService *service.ConcertService) *ConcertHandler {
	return &ConcertHandler{concertService: concertService}
}

func (h *ConcertHandler) UpcomingConcerts(c *gin.Context) {
	res, _ := h.concertService.ListUpcomingConcerts(c)
	c.JSON(http.StatusOK, res)
}

func (h *ConcertHandler) ConcertsById(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID kendaraan harus berupa angka"})
		return
	}

	res, _ := h.concertService.ConcertsById(c, id)
	c.JSON(http.StatusOK, res)
}

type CreateConcertRequest struct {
	VenueID     *int32  `json:"venue_id"`
	Title       string  `json:"title" binding:"required"`
	ArtistName  string  `json:"artist_name" binding:"required"`
	EventDate   string  `json:"event_date" binding:"required"`
	Description *string `json:"description"`
	ImageUrl    *string `json:"image_url"`
}

func (h *ConcertHandler) CreateConcert(c *gin.Context) {
	var req CreateConcertRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	eventDate, err := time.Parse(time.RFC3339, req.EventDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "event_date must be RFC3339 format"})
		return
	}

	params := db.CreateConcertParams{
		Title:      req.Title,
		ArtistName: req.ArtistName,
		EventDate:  eventDate,
	}

	if req.VenueID != nil {
		params.VenueID = sql.NullInt32{Int32: *req.VenueID, Valid: true}
	}
	if req.Description != nil {
		params.Description = sql.NullString{String: *req.Description, Valid: true}
	}
	if req.ImageUrl != nil {
		params.ImageUrl = sql.NullString{String: *req.ImageUrl, Valid: true}
	}

	concert, err := h.concertService.CreateConcert(c, params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, concert)
}
