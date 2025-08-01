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

type AttendanceStats struct {
	SubjectCode     string `json:"subject_code"`
	AttendedClasses int    `json:"attended_classes"`
	TotalClasses    int    `json:"total_classes"`
	Percentage      int    `json:"percentage"`
}

func GetAttendanceStats(userID int) ([]AttendanceStats, error) {
	rows, err := config.DB.Query(context.Background(), `
		SELECT s.subject_code, us.attended_classes, us.total_classes
		FROM user_subjects us
		JOIN subjects s ON us.subject_id = s.id
		WHERE us.user_id = $1
	`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var stats []AttendanceStats
	for rows.Next() {
		var a AttendanceStats
		err := rows.Scan(&a.SubjectCode, &a.AttendedClasses, &a.TotalClasses)
		if err != nil {
			continue
		}
		if a.TotalClasses > 0 {
			a.Percentage = int(float64(a.AttendedClasses) / float64(a.TotalClasses) * 100)
		} else {
			a.Percentage = 0
		}
		stats = append(stats, a)
	}
	return stats, nil
}
