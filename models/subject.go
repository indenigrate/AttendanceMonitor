package models

import (
	"AttendanceMonitor/config"
	"context"
)

func AddSubject(subjectCode string) error {
	_, err := config.DB.Exec(context.Background(), `
		INSERT INTO subjects (subject_code) VALUES ($1)
		ON CONFLICT DO NOTHING
	`, subjectCode)
	return err
}

func GetSubjectID(subjectCode string) (int, error) {
	row := config.DB.QueryRow(context.Background(), `
		SELECT id FROM subjects WHERE subject_code = $1
	`, subjectCode)

	var id int
	err := row.Scan(&id)
	return id, err
}
