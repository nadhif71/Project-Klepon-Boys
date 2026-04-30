package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) HotelLists(c *gin.Context) {
	res, _ := s.queries.ListHotels(c)
	c.JSON(http.StatusOK, res)
}

func (s *Server) HotelByID(c *gin.Context) {
	res, _ := s.queries.ListHotels(c)
	c.JSON(http.StatusOK, res)
}
