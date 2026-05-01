package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type HotelHandler struct {
	hotelService *service.HotelService
}

func NewHotelHandler(hotelService *service.HotelService) *HotelHandler {
	return &HotelHandler{hotelService: hotelService}
}

func (h *HotelHandler) HotelLists(c *gin.Context) {
	res, _ := h.hotelService.HotelList(c)
	c.JSON(http.StatusOK, res)
}
