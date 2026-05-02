package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type TicketHandler struct {
	ticketService *service.TiketService
}

func NewTicketHandler(ticketService *service.TiketService) *TicketHandler {
	return &TicketHandler{ticketService: ticketService}
}

func (h *TicketHandler) GetTicketsForConcert(c *gin.Context) {
	concert_id := c.Param("id")
	concertId64, err := strconv.ParseInt(concert_id, 10, 32)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing string to int"})
	}

	concertId := int32(concertId64)

	res, err := h.ticketService.TicketsForConcert(c, concertId)

	c.JSON(http.StatusOK, res)
}

func (h *TicketHandler) UpdateTicketStock(c *gin.Context) {
	ticket_id := c.Param("id")
	ticketId64, err := strconv.ParseInt(ticket_id, 10, 32)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing string to int"})
	}

	ticketId := int32(ticketId64)

	var req service.StockUpdateRequest
	res, err := h.ticketService.UpdateTicketStock(c, ticketId, int32(req.Stock))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
	}

	c.JSON(http.StatusOK, res)

}
