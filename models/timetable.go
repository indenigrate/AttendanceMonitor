package models

import (
	"AttendanceMonitor/config"
	"context"
)

type TimetableEntry struct {
	SubjectCode string `json:"subject_code"`
	Slot        string `json:"slot"`
}

func GetWeeklyTimetable(userID int) ([]TimetableEntry, error) {
	rows, err := config.DB.Query(context.Background(), `
		SELECT s.subject_code, ss.slot
		FROM user_subjects us
		JOIN subjects s ON us.subject_id = s.id
		JOIN subject_slots ss ON s.id = ss.subject_id
		WHERE us.user_id = $1
	`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var entries []TimetableEntry
	for rows.Next() {
		var entry TimetableEntry
		err := rows.Scan(&entry.SubjectCode, &entry.Slot)
		if err != nil {
			continue
		}
		entries = append(entries, entry)
	}
	return entries, nil
}
