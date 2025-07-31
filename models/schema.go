package models

import (
	"AttendanceMonitor/config"
	"context"
	"fmt"
)

// Initialise DB tables
func InitAllTables() error {
	schema := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			username TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT NOW()
		);`,

		`CREATE TABLE IF NOT EXISTS subjects (
			id SERIAL PRIMARY KEY,
			subject_code TEXT NOT NULL UNIQUE
		);`,

		`CREATE TABLE IF NOT EXISTS subject_slots (
			id SERIAL PRIMARY KEY,
			subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
			slot CHAR(20) NOT NULL,
			UNIQUE(subject_id, slot)
		);`,

		`CREATE TABLE IF NOT EXISTS user_subjects (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
			total_classes INTEGER DEFAULT 0,
			attended_classes INTEGER DEFAULT 0,
			UNIQUE(user_id, subject_id)
		);`,

		`CREATE TABLE IF NOT EXISTS attendances (
			id SERIAL PRIMARY KEY,
			user_subject_id INTEGER NOT NULL REFERENCES user_subjects(id) ON DELETE CASCADE,
			date_attended DATE NOT NULL,
			UNIQUE(user_subject_id, date_attended)
		);`,
	}

	for i, stmt := range schema {
		if _, err := config.DB.Exec(context.Background(), stmt); err != nil {
			return fmt.Errorf("error creating table #%d: %w", i, err)
		}
	}
	fmt.Println("Database Tables intitialised!")
	return nil
}
