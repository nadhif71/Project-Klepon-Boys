package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
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
