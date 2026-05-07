package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type VenueHandler struct {
	venueService *service.VenueService
}

func NewVenueHandler(venueService *service.VenueService) *VenueHandler {
	return &VenueHandler{venueService: venueService}
}

func (h *VenueHandler) ListVenues(c *gin.Context) {
	res, err := h.venueService.ListVenues(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (h *VenueHandler) GetVenue(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID harus berupa angka"})
		return
	}

	res, err := h.venueService.GetVenue(c, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "venue not found"})
		return
	}
	c.JSON(http.StatusOK, res)
}
