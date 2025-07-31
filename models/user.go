package models

import (
	"AttendanceMonitor/config"
	"context"
)

type User struct {
	ID       int
	Username string
	Password string
}

func CreateUser(username, hashedPassword string) error {
	_, err := config.DB.Exec(context.Background(), `
		INSERT INTO users (username, password)
		VALUES ($1, $2)
	`, username, hashedPassword)
	return err
}
