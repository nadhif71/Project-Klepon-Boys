package main

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/nadhif71/Project-Klepon-Boys/db"
	"github.com/nadhif71/Project-Klepon-Boys/handler"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

func main() {
	godotenv.Load()

	conn, err := sql.Open("postgres", "postgresql://admin:admin@localhost:5432/otintern?sslmode=disable")
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	queries := db.New(conn)

	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	authService := service.NewAuthService(queries, jwtSecret)
	itineraryService := service.NewItinearyService(queries)
	concertService := service.NewConcertService(queries)
	routeService := service.NewRouteService(queries)

	server := handler.NewServer(queries, authService, itineraryService, concertService, routeService)

	err = server.Start(":8080")
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}
