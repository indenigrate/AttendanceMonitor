package config

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var DB *pgxpool.Pool

// Connect to DB
func InitDB() {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env")
	}

	dsn := os.Getenv("DATABASE_URL")
	dbpool, err := pgxpool.New(context.Background(), dsn)
	if err != nil {
		panic("Unable to connect to database")
	}

	DB = dbpool
	err = DB.Ping(context.Background())
	if err != nil {
		panic("Ping failed: " + err.Error())
	}
	fmt.Println("Connected to DB!")
}
