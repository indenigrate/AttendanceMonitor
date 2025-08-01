package controllers

import (
	"AttendanceMonitor/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func AddSubject(c *gin.Context) {
	var body struct {
		SubjectCode string `json:"subject_code"`
		Slot        string `json:"slot"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// userID, err := strconv.Atoi(c.GetString("user_id"))
	// if err != nil {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
	// 	return
	// }
	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	userID, ok := userIDVal.(int)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID format error"})
		return
	}

	// Add subject and slot
	err := models.AddSubject(body.SubjectCode, body.Slot)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not add subject"})
		return
	}

	// Get subject ID
	subjectID, err := models.GetSubjectID(body.SubjectCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not get subject ID"})
		return
	}

	// Enroll user in subject
	err = models.EnrollSubject(userID, subjectID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Enrollment failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Subject added and enrolled"})
}

func UpdateAttendance(c *gin.Context) {
	var body struct {
		Attended []string `json:"attended"` // subject codes
		Missed   []string `json:"missed"`   // subject codes
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// userID, err := strconv.Atoi(c.GetString("user_id"))
	// if err != nil {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
	// 	return
	// }
	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	userID, ok := userIDVal.(int)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID format error"})
		return
	}

	date := time.Now()

	// Mark attended subjects
	for _, code := range body.Attended {
		subID, err := models.GetSubjectID(code)
		if err != nil {
			continue
		}
		usID, err := models.GetUserSubjectID(userID, subID)
		if err != nil {
			continue
		}
		models.MarkAttendance(usID, date)
	}

	// Mark missed subjects
	for _, code := range body.Missed {
		subID, err := models.GetSubjectID(code)
		if err != nil {
			continue
		}
		usID, err := models.GetUserSubjectID(userID, subID)
		if err != nil {
			continue
		}
		models.MarkAbsent(usID)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Attendance updated"})
}
