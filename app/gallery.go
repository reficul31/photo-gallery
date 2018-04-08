package app

/*
The gallery api
*/

import (
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"net/http"
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
