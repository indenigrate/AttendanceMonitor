package models

import (
	"AttendanceMonitor/config"
	"context"
	"time"
)

func GetUserSubjectID(userID, subjectID int) (int, error) {
	row := config.DB.QueryRow(context.Background(), `
		SELECT id FROM user_subjects WHERE user_id = $1 AND subject_id = $2
	`, userID, subjectID)

	var id int
	err := row.Scan(&id)
	return id, err
}

func MarkAttendance(userSubjectID int, date time.Time) error {
	_, err := config.DB.Exec(context.Background(), `
		INSERT INTO attendances (user_subject_id, date_attended)
		VALUES ($1, $2)
		ON CONFLICT DO NOTHING
	`, userSubjectID, date)

	_, _ = config.DB.Exec(context.Background(), `
		UPDATE user_subjects
		SET attended_classes = attended_classes + 1,
			total_classes = total_classes + 1
		WHERE id = $1
	`, userSubjectID)
	return err
}

func MarkAbsent(userSubjectID int) error {
	_, err := config.DB.Exec(context.Background(), `
		UPDATE user_subjects
		SET total_classes = total_classes + 1
		WHERE id = $1
	`, userSubjectID)
	return err
}
