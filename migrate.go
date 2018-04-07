package main

import (
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/reficul31/codechef-photo-gallery/app"
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
			DBName:     "hawk",
		}
	}

	db, err := gorm.Open("sqlite3", "gallery.db")
	defer db.Close()

	db.AutoMigrate(&app.Tag{}, &app.Post{})
	db.Model(&app.Album{}).Related(&app.Photos{}, "Photos")
	log.Println("Migration Successful")
}
