package main

import (
	"AttendanceMonitor/config"
	"AttendanceMonitor/models"
	"AttendanceMonitor/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()
	models.InitAllTables()

	r := gin.Default()
	routes.SetupRoutes(r)

	r.Run(":8080")
}
