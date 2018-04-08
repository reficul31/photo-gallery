package app

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql" // the mysql driver
	"github.com/jinzhu/gorm"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
)

// App encloses the router and db.
type App struct {
	Router *httprouter.Router
	Config Configuration
}

type Database struct {
	db *gorm.DB
}

var (
	DB         Database
	err        error           // Error Global
	currUser   CurrentUser     // Current user data global
)

// Initialize the router and db.
func (a *App) Initialize(config Configuration) {
	a.Config = config

	connectionString := fmt.Sprintf("%s:%s@/%s?charset=utf8&parseTime=True&loc=Local",
		config.DBUsername,
		config.DBPassword,
		config.DBName)

	DB.db, err = gorm.Open("mysql", connectionString)
	if err != nil {
		log.Fatal(err)
	}

	DB.db.LogMode(config.DbLog)
	a.Router = NewRouter()
	PopulateTemplates(a.Config.TemplateRoot)
}

// Run the http server.
func (a *App) Run() {
	a.Router.NotFound = http.FileServer(http.Dir("public"))
	// Close the Redis and Database connections if app stops.
	defer DB.db.Close()
	log.Println("running server on ", a.Config.ServerAddr)
	log.Fatal(http.ListenAndServe(a.Config.ServerAddr, a.Router))
}
