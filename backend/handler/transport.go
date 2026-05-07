package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type TransportHandler struct {
	transportService *service.TransportService
}

func NewTransportHandler(transportService *service.TransportService) *TransportHandler {
	return &TransportHandler{transportService: transportService}
}

func (h *TransportHandler) ListCities(c *gin.Context) {
	res, err := h.transportService.ListCities(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (h *TransportHandler) GetCityHubs(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID harus berupa angka"})
		return
	}

	res, err := h.transportService.GetCityHubs(c, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "city not found"})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (h *TransportHandler) ListTransportOptions(c *gin.Context) {
	originHubStr := c.Query("origin_hub")
	destHubStr := c.Query("destination_hub")

	originHubID, _ := strconv.Atoi(originHubStr)
	destHubID, _ := strconv.Atoi(destHubStr)

	res, err := h.transportService.ListTransportOptions(c, originHubID, destHubID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}
