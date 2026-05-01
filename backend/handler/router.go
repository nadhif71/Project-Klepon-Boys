package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/db"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type Server struct {
	queries          *db.Queries
	router           *gin.Engine
	authHandler      *AuthHandler
	itineraryHandler *IitineraryHandler
}

func NewServer(queries *db.Queries, authService *service.AuthService, itineraryService *service.ItineraryService) *Server {
	server := &Server{
		queries:          queries,
		authHandler:      NewAuthHandler(authService),
		itineraryHandler: NewItineraryHandler(itineraryService),
	}

	router := gin.Default()

	router.GET("/hotels", server.HotelLists)
	router.POST("/login", server.authHandler.Login)
	router.POST("/register", server.authHandler.Register)
	router.GET("/concerts", server.UpcomingConcerts)
	router.GET("/concerts/:id", server.ConcertsById)
	router.GET("/route/:id", server.VenueRoutes)

	protected := router.Group("/")
	protected.Use(server.authHandler.AuthMiddleware())
	{
		protected.POST("/itinerary", server.itineraryHandler.CreateItinerary)
		protected.GET("/itinerary", server.UserItineraries)
	}

	server.router = router
	return server
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
