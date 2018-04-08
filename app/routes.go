package app

import (
	"log"
	"net/http"
	"time"

	"github.com/julienschmidt/httprouter"
)

/*
   Contains the routes and the Middleware Logger
*/

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc httprouter.Handle
}

type Routes []Route

func NewRouter() *httprouter.Router {
	router := httprouter.New()
	for _, route := range routes {
		var handler httprouter.Handle
		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)

		if route.Method == "GET" {
			router.GET(route.Pattern, handler)
		} else if route.Method == "POST" {
			router.POST(route.Pattern, handler)
		} else if route.Method == "PUT" {
			router.PUT(route.Pattern, handler)
		} else if route.Method == "DELETE" {
			router.DELETE(route.Pattern, handler)
		}

	}
	return router
}

func Logger(inner httprouter.Handle, name string) httprouter.Handle {
	return httprouter.Handle(func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		start := time.Now()

		defer inner(w, r, ps)

		log.Printf(
			"%s\t%s\t%s\t%s",
			r.Method,
			r.RequestURI,
			name,
			time.Since(start),
		)
	})
}

func RequiresLogin(inner httprouter.Handle, isAdmin bool) httprouter.Handle {
	return httprouter.Handle(func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		defer r.Body.Close()
		if !SetCurrentUser(r) {
			http.Redirect(w, r, "/login", 302)
			return
		}
		if isAdmin == true && currUser.AccessLevel == 69 {
			inner(w, r, ps)
			return
		} else if isAdmin == true && currUser.AccessLevel != 69 {
			http.Redirect(w, r, "/", 302)
			return
		}
		inner(w, r, ps)
	})
}

var routes = Routes{
	Route{
		"Game",
		"GET",
		"/",
		RequiresLogin(Game, false),
	},
	Route{
		"Login",
		"GET",
		"/login",
		Landing,
	},
	Route{
		"ResetPassword",
		"GET",
		"/resetpassword",
		Landing,
	},
	Route{
		"ResetPassword",
		"POST",
		"/resetpassword",
		ResetPasswordHandler,
	},
	Route{
		"Register",
		"GET",
		"/register",
		Landing,
	},
	Route{
		"Register",
		"POST",
		"/register",
		Register,
	},
	Route{
		"Login",
		"POST",
		"/login",
		Login,
	},
	Route{
		"Logout",
		"GET",
		"/logout",
		Logout,
	},
	Route{
		"ForgotPassword",
		"POST",
		"/forgotpassword",
		ForgotPasswordHandler,
	},
	//Route{
	//	"GetPlayer",
	//	"GET",
	//	"/getPlayer",
	//	RequiresLogin(GetPlayer, false),
	//},
	//Route{
	//	"ModifyPlayer",
	//	"POST",
	//	"/modifyPlayer",
	//	RequiresLogin(ModifyPlayer, false),
	//},
}
