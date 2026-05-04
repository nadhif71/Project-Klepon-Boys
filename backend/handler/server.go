package handler

import (
	"github.com/gin-contrib/cors"
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
	concertHandler := NewConcertHandler(svcs.Concert)
	routeHandler := NewRouteHandler(svcs.Route)
	hotelHandler := NewHotelHandler(svcs.Hotel)
	tiketHandler := NewTicketHandler(svcs.Ticket)
	intercityHandler := NewIntercityHandler(svcs.Intercity)
	pickupHandler := NewPickupHandler(svcs.Pickup)
	dashboardHandler := NewDashboardHandler(svcs.Dashboard)

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/hotels", hotelHandler.HotelLists)
	router.GET("/hotels/:id", hotelHandler.GetHotel)
	router.POST("/login", authHandler.Login)
	router.POST("/register", authHandler.Register)
	router.GET("/concerts", concertHandler.UpcomingConcerts)
	router.GET("/concerts/:id", concertHandler.ConcertsById)
	router.GET("/route/:id", routeHandler.VenueRoutes)
	router.GET("/concert/:id/tickets", tiketHandler.GetTicketsForConcert)
	router.PATCH("/tickets/:id", tiketHandler.UpdateTicketStock)
	router.GET("/venue/:id/pickups", pickupHandler.ListPickupPointsForVenue)

	protected := router.Group("/")
	protected.Use(authHandler.AuthMiddleware())
	{
		protected.POST("/ticketorders", tiketHandler.CreateTicketOrder)
		protected.GET("/ticketorders", tiketHandler.GetTicketOrdersByUser)
		protected.POST("/hotelbookings", hotelHandler.CreateHotelBooking)
		protected.GET("/hotelbookings", hotelHandler.GetHotelBookingsByUser)
		protected.POST("/intercities", intercityHandler.CreateIntercityTransport)
		protected.GET("/intercities", intercityHandler.GetIntercityTransportsByUser)
		protected.POST("/crowdcheckins", pickupHandler.CreateCrowdCheckin)
		protected.GET("/dashboard", dashboardHandler.GetUserDashboard)
	}

	server.router = router
	return server
}

func (s *Server) Router() *gin.Engine {
	return s.router
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
