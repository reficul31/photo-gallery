package main

import (
	"log"

	"github.com/reficul31/codechef-photo-gallery/app"
)

func main() {
	values, err := app.ReadConfig("config.json")

	if err != nil {
		log.Println("Problem reading the config file; Falling back to default")
		values = app.Configuration{
			ServerAddr: ":8080",
			DBUsername: "root",
			DBPassword: "reficul31",
			DBName:     "gallery",
			SecretKey:  "db51542b6345e5d681809ffe9b2ec271",
		}
	}
	blog := app.App{}
	blog.Initialize(values)
	blog.Run()
}
