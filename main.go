package main

import (
	"AttendanceMonitor/config"
	"AttendanceMonitor/models"
	"AttendanceMonitor/utils"
	"fmt"
	"log"
)

func main() {
	config.InitDB()

	if err := models.InitAllTables(); err != nil {
		log.Fatal("DB schema init failed:", err)
	}
	key, err := utils.GenerateJWT("onesine")
	fmt.Println(key, err)
}
