package handler

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (s *Server) VenueRoutes(c *gin.Context) {
	idStr := c.Param("id")

	dest_id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID destinasi harus berupa angka"})
		return
	}

	res, _ := s.queries.GetRoutesForVenue(c, sql.NullInt32{Int32: int32(dest_id), Valid: true})
	c.JSON(http.StatusOK, res)
}
