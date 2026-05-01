package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (s *Server) UpcomingConcerts(c *gin.Context) {
	res, _ := s.queries.ListUpcomingConcerts(c)
	c.JSON(http.StatusOK, res)
}

func (s *Server) ConcertsById(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID kendaraan harus berupa angka"})
		return
	}

	res, _ := s.queries.GetConcert(c, int32(id))
	c.JSON(http.StatusOK, res)
}
