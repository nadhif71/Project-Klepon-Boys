package handler

import (
	"net/http"
	"strconv"

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

func (h *HotelHandler) GetHotel(c *gin.Context) {
	hotel_id := c.Param("id")

	hotelId, err := strconv.Atoi(hotel_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID kendaraan harus berupa angka"})
		return
	}

	res, err := h.hotelService.GetHotel(c, hotelId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	c.JSON(http.StatusOK, res)
}

func (h *HotelHandler) CreateHotelBooking(c *gin.Context) {
	var req service.HotelBookingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
		return
	}

	res, err := h.hotelService.CreateHotelBooking(c, userId, req.HotelID, req.CheckInDate, req.CheckOutDate, req.Status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, res)
}

func (h *HotelHandler) GetHotelBookingsByUser(c *gin.Context) {
	userId, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
	}

	res, err := h.hotelService.GetHotelBookingsByUser(c, userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	c.JSON(http.StatusOK, res)
}

func (h *HotelHandler) GetHotelBooking(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID harus berupa angka"})
		return
	}

	res, err := h.hotelService.GetHotelBookingByID(c, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "booking not found"})
		return
	}
	c.JSON(http.StatusOK, res)
}
