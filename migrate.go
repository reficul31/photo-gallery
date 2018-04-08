package main

import (
	"log"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/reficul31/codechef-photo-gallery/app"
	"github.com/jinzhu/gorm"
)

// @todo Implement a better migration scheme

func main() {
	config, err := app.ReadConfig("config.json")

	if err != nil {
		log.Println("Problem reading the config file; Falling back to default")
		config = app.Configuration{
			ServerAddr: ":8000",
			DBUsername: "root",
			DBPassword: "reficul31",
			DBName:     "gallery",
		}
	}

	connectionString := fmt.Sprintf("%s:%s@/%s?charset=utf8&parseTime=True&loc=Local",
		config.DBUsername,
		config.DBPassword,
		config.DBName)
	db, err := gorm.Open("mysql", connectionString)
	defer db.Close()
	db.AutoMigrate(&app.User{}, &app.ForgotPassword{}, &app.Photo{}, &app.Album{})
	db.Model(&app.Album{}).Related(&app.Photo{})
	db.Model(&app.User{}).Related(&app.Album{})

	log.Println("Migration Successful")
}
