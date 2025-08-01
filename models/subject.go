package models

import (
	"AttendanceMonitor/config"
	"context"
)

func AddSubject(subjectCode, slot string) error {
	// Insert subject if it doesn't already exist
	_, err := config.DB.Exec(context.Background(), `
		INSERT INTO subjects (subject_code)
		VALUES ($1)
		ON CONFLICT DO NOTHING
	`, subjectCode)
	if err != nil {
		return err
	}

	// Get subject ID
	subjectID, err := GetSubjectID(subjectCode)
	if err != nil {
		return err
	}

	// Insert slot for the subject
	_, err = config.DB.Exec(context.Background(), `
		INSERT INTO subject_slots (subject_id, slot)
		VALUES ($1, $2)
		ON CONFLICT (subject_id, slot) DO NOTHING
	`, subjectID, slot)
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
