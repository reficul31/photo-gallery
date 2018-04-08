package app

/*
The gallery api
*/

import (
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"net/http"
	"strconv"
)

func AlbumHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var out []byte // json output

	switch r.Method {
	case "GET":
		albums := &Albums{}
		if err = DB.db.Where("user_id = ?", currUser.ID).Find(&albums).Error; err != nil {
			write_response(err, w, false, "Couldn't fetch the albums")
			return
		}

		out, err = json.Marshal(albums)
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

	case "POST":
		album := Album{}
		err = json.NewDecoder(r.Body).Decode(&album)
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

		tx := DB.db.Begin()
		album.UserID = uint(currUser.ID)

		if err = tx.Create(&album).Error; err != nil {
			tx.Rollback()
			write_response(err, w, false, "Can't add album")
			return
		}
		tx.Commit()

		out = []byte("Album Added!")

	case "PUT":
		album := Album{}

		err := json.NewDecoder(r.Body).Decode(&album)
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

		tx := DB.db.Begin()
		if err = tx.Model(&album).Updates(map[string]interface{}{"name": album.Name, "privacy": album.Privacy, "description": album.Description}).Error; err != nil {
			tx.Rollback()
			write_response(err, w, false, "Can't update user")
			return
		}
		tx.Commit()

		out = []byte("Album Updated!")

	case "DELETE":
		album := Album{}
		err = json.NewDecoder(r.Body).Decode(&album)
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

		tx := DB.db.Begin()
		if err = tx.Delete(&album).Error; err != nil {
			tx.Rollback()
			write_response(err, w, false, "Can't delete album.")
		}
		tx.Commit()

		out = []byte("Album Deleted!")
	}

	write_response(nil, w, true, string(out))
	return
}

func PhotoHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var out []byte // json output

	switch r.Method {
	case "GET":
		photos := &Photos{}
		if err = DB.db.Find(&photos).Error; err != nil {
			write_response(err, w, false, "Couldn't fetch the photos")
			return
		}

		out, err = json.Marshal(photos)
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

	case "POST":
		r.ParseMultipartForm(32 << 20)
		file, handler, err := r.FormFile("file")
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

		handler.Filename = RandStringRunes(20)

		mimeType := handler.Header.Get("Content-Type")
		switch mimeType {
		case "image/png":
		    err = saveFile(w, file, handler)
		default:
		    write_response(err, w, false, "The format file is not valid. Please upload only png images.")
		    return
		}

		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

		description := r.Form["description"][0]
		privacy, err := strconv.Atoi(r.Form["privacy"][0])
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

		albumId, err := strconv.Atoi(r.Form["albumId"][0])
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

		photo := Photo{
			Name: handler.Filename,
			Description: description,
			Privacy: privacy,
			AlbumID: uint(albumId),
			Likes: 0,
		}

		tx := DB.db.Begin()

		if err = tx.Create(&photo).Error; err != nil {
			tx.Rollback()
			write_response(err, w, false, "Can't add photo")
			return
		}
		tx.Commit()

		out = []byte("Photo Added!")

	case "DELETE":
		photo := Photo{}
		err = json.NewDecoder(r.Body).Decode(&photo)
		if err != nil {
			write_response(err, w, false, "Internal Server Error")
			return
		}

		tx := DB.db.Begin()
		if err = tx.Delete(&photo).Error; err != nil {
			tx.Rollback()
			write_response(err, w, false, "Can't delete photo.")
		}
		tx.Commit()

		out = []byte("Photo Deleted!")
	}

	write_response(nil, w, true, string(out))
	return
}
