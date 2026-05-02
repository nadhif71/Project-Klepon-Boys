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
	concertHandler := NewConcertHandler(svcs.Concert)
	routeHandler := NewRouteHandler(svcs.Route)
	hotelHandler := NewHotelHandler(svcs.Hotel)
	tiketHandler := NewTicketHandler(svcs.Ticket)

	router := gin.Default()

	router.GET("/hotels", hotelHandler.HotelLists)
	router.POST("/login", authHandler.Login)
	router.POST("/register", authHandler.Register)
	router.GET("/concerts", concertHandler.UpcomingConcerts)
	router.GET("/concerts/:id", concertHandler.ConcertsById)
	router.GET("/route/:id", routeHandler.VenueRoutes)
	router.GET("/concert/:id/tickets", tiketHandler.GetTicketsForConcert)
	router.PATCH("/tickets/:id", tiketHandler.UpdateTicketStock)

	protected := router.Group("/")
	protected.Use(authHandler.AuthMiddleware())
	{
		protected.POST("/ticketorders", tiketHandler.CreateTicketOrder)
		protected.GET("/ticketorders", tiketHandler.GetTicketOrdersByUser)
	}

	server.router = router
	return server
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
