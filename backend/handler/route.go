package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type RouteHandler struct {
	routeService *service.RouteService
}

func NewRouteHandler(routeService *service.RouteService) *RouteHandler {
	return &RouteHandler{
		routeService: routeService,
	}
}

func (h *RouteHandler) VenueRoutes(c *gin.Context) {
	idStr := c.Param("id")

	dest_id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID destinasi harus berupa angka"})
		return
	}

	res, _ := h.routeService.GetRoutesForVenue(c, dest_id)
	c.JSON(http.StatusOK, res)
}
