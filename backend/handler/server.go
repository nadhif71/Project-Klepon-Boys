package handler

import (
	"time"

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
	venueHandler := NewVenueHandler(svcs.Venue)
	transportHandler := NewTransportHandler(svcs.Transport)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/hotels", hotelHandler.HotelLists)
	router.GET("/hotels/:id", hotelHandler.GetHotel)
	router.POST("/login", authHandler.Login)
	router.POST("/register", authHandler.Register)
	router.POST("/forgot-password", authHandler.ForgotPassword)
	router.POST("/reset-password", authHandler.ResetPassword)
	router.GET("/concerts", concertHandler.UpcomingConcerts)
	router.POST("/concerts", concertHandler.CreateConcert)
	router.GET("/concerts/:id", concertHandler.ConcertsById)
	router.GET("/route/:id", routeHandler.VenueRoutes)
	router.GET("/concert/:id/tickets", tiketHandler.GetTicketsForConcert)
	router.PATCH("/tickets/:id", tiketHandler.UpdateTicketStock)
	router.GET("/venue/:id/pickups", pickupHandler.ListPickupPointsForVenue)
	router.GET("/venues", venueHandler.ListVenues)
	router.GET("/venues/:id", venueHandler.GetVenue)
	router.GET("/cities", transportHandler.ListCities)
	router.GET("/cities/:id/hubs", transportHandler.GetCityHubs)
	router.GET("/transport-options", transportHandler.ListTransportOptions)

	protected := router.Group("/")
	protected.Use(authHandler.AuthMiddleware())
	{
		protected.POST("/ticketorders", tiketHandler.CreateTicketOrder)
		protected.GET("/ticketorders", tiketHandler.GetTicketOrdersByUser)
		protected.GET("/ticketorders/:id", tiketHandler.GetTicketOrder)
		protected.POST("/hotelbookings", hotelHandler.CreateHotelBooking)
		protected.GET("/hotelbookings", hotelHandler.GetHotelBookingsByUser)
		protected.GET("/hotelbookings/:id", hotelHandler.GetHotelBooking)
		protected.POST("/intercities", intercityHandler.CreateIntercityTransport)
		protected.GET("/intercities", intercityHandler.GetIntercityTransportsByUser)
		protected.GET("/intercities/:id", intercityHandler.GetIntercity)
		protected.POST("/crowdcheckins", pickupHandler.CreateCrowdCheckin)
		protected.GET("/crowdcheckins", pickupHandler.ListCrowdCheckins)
		protected.GET("/crowdcheckins/:id", pickupHandler.GetCrowdCheckin)
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
