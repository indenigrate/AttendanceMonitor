package models

import (
	"AttendanceMonitor/config"
	"context"
)

func EnrollSubject(userID, subjectID int) error {
	_, err := config.DB.Exec(context.Background(), `
		INSERT INTO user_subjects (user_id, subject_id)
		VALUES ($1, $2)
		ON CONFLICT DO NOTHING
	`, userID, subjectID)
	return err
}
