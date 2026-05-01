package main

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/nadhif71/Project-Klepon-Boys/db"
	api "github.com/nadhif71/Project-Klepon-Boys/handler"
	"github.com/nadhif71/Project-Klepon-Boys/service"
)

type Server struct {
	queries *db.Queries
}

func main() {
	conn, err := sql.Open("postgres", "postgresql://admin:admin@localhost:5432/otintern?sslmode=disable")
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	queries := db.New(conn)

	godotenv.Load()
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	authService := service.NewAuthService(queries, jwtSecret)

	server := api.NewServer(queries, authService)

	err = server.Start(":8080")
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}
