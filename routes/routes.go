package routes

import (
	"AttendanceMonitor/controllers"
	"AttendanceMonitor/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	// Public routes
	public := router.Group("/api")
	{
		public.POST("/signup", controllers.Signup)
		public.POST("/login", controllers.Login)
		public.GET("/healthz", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status": "ok",
			})
		})
		public.GET("/cors-test", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "CORS test successful",
				"headers": c.Request.Header,
			})
		})

	}

	// Protected routes with JWT auth
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/add-subject", controllers.AddSubject)
		protected.POST("/mark-attendance", controllers.UpdateAttendance)
		protected.GET("/get-weekly-timetable", controllers.GetWeeklyTimetable)
		protected.GET("/get-attendance-stats", controllers.GetAttendanceStats)
		// protected.GET("/subjects", controllers.GetAllSubjects)
	}
}
