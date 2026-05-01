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
	itineraryHandler *ItineraryHandler
	concertHandler   *ConcertHandler
	routeHandler     *RouteHandler
}

func NewServer(queries *db.Queries, authService *service.AuthService, itineraryService *service.ItineraryService,
	concertService *service.ConcertService, routeService *service.RouteService) *Server {
	server := &Server{
		queries:          queries,
		authHandler:      NewAuthHandler(authService),
		itineraryHandler: NewItineraryHandler(itineraryService),
		concertHandler:   NewConcertHandler(concertService),
		routeHandler:     NewRouteHandler(routeService),
	}

	router := gin.Default()

	router.GET("/hotels", server.HotelLists)
	router.POST("/login", server.authHandler.Login)
	router.POST("/register", server.authHandler.Register)
	router.GET("/concerts", server.concertHandler.UpcomingConcerts)
	router.GET("/concerts/:id", server.concertHandler.ConcertsById)
	router.GET("/route/:id", server.routeHandler.VenueRoutes)

	protected := router.Group("/")
	protected.Use(server.authHandler.AuthMiddleware())
	{
		protected.POST("/itinerary", server.itineraryHandler.CreateItinerary)
		protected.GET("/itinerary", server.itineraryHandler.UserItineraries)
	}

	server.router = router
	return server
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
