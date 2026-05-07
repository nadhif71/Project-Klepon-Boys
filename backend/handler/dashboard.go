package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type DashboardHandler struct {
	dashboardService *service.DashboardService
}

func NewDashboardHandler(dashboardService *service.DashboardService) *DashboardHandler {
	return &DashboardHandler{
		dashboardService: dashboardService,
	}
}

func (h *DashboardHandler) GetUserDashboard(c *gin.Context) {
	userId, exist := c.Get("user_id")
	if exist == false {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login dulu"})
		return
	}

	res, err := h.dashboardService.GetUserDashboard(c, userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, res)
}
