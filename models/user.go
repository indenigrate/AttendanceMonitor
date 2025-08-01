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

func GetUserByUsername(username string) (*User, error) {
	row := config.DB.QueryRow(context.Background(), `
		SELECT id, username, password
		FROM users
		WHERE username = $1
	`, username)

	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Password)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
