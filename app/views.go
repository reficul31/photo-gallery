package app

/*
Stores the views and API calls to the backend
*/
import (
	"html/template"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

var landingTemplate *template.Template
var galleryTemplate *template.Template
var templates *template.Template

//PopulateTemplates is used to parse all templates present in
//the templates folder
func PopulateTemplates(templatesDir string) {
	var allFiles []string

	files, err := ioutil.ReadDir(templatesDir)
	if err != nil {
		log.Println(err)
		os.Exit(1) // No point in running app if templates aren't read
	}
	for _, file := range files {
		filename := file.Name()
		if strings.HasSuffix(filename, ".html") {
			allFiles = append(allFiles, templatesDir+filename)
		}
	}

	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	templates := template.Must(template.ParseFiles(allFiles...))
	landingTemplate = templates.Lookup("landing.html")
	galleryTemplate = templates.Lookup("gallery.html")
}
