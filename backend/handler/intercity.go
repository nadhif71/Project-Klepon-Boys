package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type IntercityHandler struct {
	intercityService *service.IntercityService
}

func NewIntercityHandler(intercityService *service.IntercityService) *IntercityHandler {
	return &IntercityHandler{
		intercityService: intercityService,
	}
}

func (h *IntercityHandler) CreateIntercityTransport(c *gin.Context) {
	var req service.IntercityRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user_id, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
	}

	res, err := h.intercityService.CreateIntercityTransport(c, req.OriginCity, req.TransportMode, req.Status, req.DepartureDate, req.ReturnDate, user_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, res)
}

func (h *IntercityHandler) GetIntercityTransportsByUser(c *gin.Context) {
	user_id, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
	}

	res, err := h.intercityService.GetIntercityTransportByUser(c, user_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, res)
}
