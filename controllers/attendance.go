package controllers

import (
	"AttendanceMonitor/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAttendanceStats(c *gin.Context) {
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

	stats, err := models.GetAttendanceStats(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch attendance"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"attendance": stats})
}
