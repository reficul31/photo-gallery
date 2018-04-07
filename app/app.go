package app

import (
	"log"
	"net/http"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // sqlite driver for gorm
	"github.com/julienschmidt/httprouter"
)

// App encloses the router and db.
type App struct {
	Router *httprouter.Router
	Config Configuration
}

// Database gives the database access
type Database struct {
	db *gorm.DB
}

var (
	// DB is the Database adapter
	DB       Database
	err      error       // Error Global
	currUser CurrentUser // Current user data global
)

// Initialize the router and db.
func (a *App) Initialize(config Configuration) {
	a.Config = config

	DB.db, err = gorm.Open("sqlite3", "gallery.db")
	DB.db.LogMode(config.DbLog)

	if err != nil {
		log.Fatal(err)
	}

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
