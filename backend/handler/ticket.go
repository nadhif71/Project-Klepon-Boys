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
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid concert ID"})
		return
	}

	concertId := int32(concertId64)

	res, err := h.ticketService.TicketsForConcert(c, concertId)

	c.JSON(http.StatusOK, res)
}

func (h *TicketHandler) UpdateTicketStock(c *gin.Context) {
	ticket_id := c.Param("id")
	ticketId64, err := strconv.ParseInt(ticket_id, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ticket ID"})
		return
	}

	ticketId := int32(ticketId64)

	var req service.StockUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := h.ticketService.UpdateTicketStock(c, ticketId, int32(req.Stock))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *TicketHandler) CreateTicketOrder(c *gin.Context) {
	userId, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
		return
	}

	var req service.TicketOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	res, err := h.ticketService.CreateTicketOrder(c, userId, req.TicketID, req.Quantity, req.Status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (h *TicketHandler) GetTicketOrdersByUser(c *gin.Context) {
	userId, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
		return
	}

	res, err := h.ticketService.GetTicketOrdersByUser(c, userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}
