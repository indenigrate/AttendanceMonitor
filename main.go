package main

import (
	"AttendanceMonitor/config"
	"AttendanceMonitor/models"
	"AttendanceMonitor/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()
	models.InitAllTables()

	r := gin.Default()

	// Custom CORS middleware
	// Replace cors.Default() with a specific configuration
	corsConfig := cors.DefaultConfig()

	// Replace with your frontend's actual origin, e.g., "http://localhost:3000"
	corsConfig.AllowAllOrigins = false
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}

	// You must explicitly allow the OPTIONS method
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}

	// Add any custom headers your frontend sends, like "Authorization"
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}

	r.Use(cors.New(corsConfig))

	routes.SetupRoutes(r)

	r.Run(":8080")
}
