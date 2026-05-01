package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type Server struct {
	services *service.Services
	router   *gin.Engine
}

func NewServer(svcs *service.Services) *Server {
	server := &Server{
		services: svcs,
	}

	authHandler := NewAuthHandler(svcs.Auth)
	itineraryHandler := NewItineraryHandler(svcs.Itinerary)
	concertHandler := NewConcertHandler(svcs.Concert)
	routeHandler := NewRouteHandler(svcs.Route)
	hotelHandler := NewHotelHandler(svcs.Hotel)

	router := gin.Default()

	router.GET("/hotels", hotelHandler.HotelLists)
	router.POST("/login", authHandler.Login)
	router.POST("/register", authHandler.Register)
	router.GET("/concerts", concertHandler.UpcomingConcerts)
	router.GET("/concerts/:id", concertHandler.ConcertsById)
	router.GET("/route/:id", routeHandler.VenueRoutes)

	protected := router.Group("/")
	protected.Use(authHandler.AuthMiddleware())
	{
		protected.POST("/itinerary", itineraryHandler.CreateItinerary)
		protected.GET("/itinerary", itineraryHandler.UserItineraries)
	}

	server.router = router
	return server
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
