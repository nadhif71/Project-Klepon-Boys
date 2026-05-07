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
	dbConnString := os.Getenv("DB_CONNECTION_STRING")

	conn, err := sql.Open("postgres", dbConnString)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	queries := db.New(conn)

	jwtSecret := []byte(os.Getenv("JWT_SECRET"))

	svcs := service.NewServices(queries, jwtSecret)
	server := handler.NewServer(svcs)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	err = server.Start(":" + port)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}
