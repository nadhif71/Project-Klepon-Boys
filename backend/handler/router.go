package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/db"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type Server struct {
	queries     *db.Queries
	router      *gin.Engine
	authHandler *AuthHandler
}

func NewServer(queries *db.Queries, authService *service.AuthService) *Server {
	server := &Server{
		queries:     queries,
		authHandler: NewAuthHandler(authService),
	}

	router := gin.Default()

	router.GET("/hotels", server.HotelLists)
	router.POST("/login", server.authHandler.Login)
	router.POST("/register", server.authHandler.Register)

	server.router = router
	return server
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
