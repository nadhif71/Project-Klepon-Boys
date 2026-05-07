package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type PickupHandler struct {
	pickupService *service.PickupService
}

func NewPickupHandler(pickupService *service.PickupService) *PickupHandler {
	return &PickupHandler{
		pickupService: pickupService,
	}
}

func (h *PickupHandler) ListPickupPointsForVenue(c *gin.Context) {
	venue_id := c.Param("id")

	venueId, err := strconv.Atoi(venue_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID kendaraan harus berupa angka"})
		return
	}

	res, err := h.pickupService.ListPickupPointsForVenue(c, venueId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	c.JSON(http.StatusOK, res)
}

func (h *PickupHandler) CreateCrowdCheckin(c *gin.Context) {
	var req service.CrowdChekinRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
		return
	}

	res, err := h.pickupService.CreateCrowdCheckin(c, userId, req.PickupPointId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	c.JSON(http.StatusOK, res)
}

func (h *PickupHandler) ListCrowdCheckins(c *gin.Context) {
	userId, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
		return
	}

	res, err := h.pickupService.ListCrowdCheckins(c, userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	c.JSON(http.StatusOK, res)
}

func (h *PickupHandler) GetCrowdCheckin(c *gin.Context) {
	idStr := c.Param("id")

	res, err := h.pickupService.GetCrowdCheckin(c, idStr)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "checkin not found"})
		return
	}
	c.JSON(http.StatusOK, res)
}
