package app

/*
Stores the route handlers
*/

import (
	"encoding/json"
	"errors"
	"github.com/julienschmidt/httprouter"
	"net/http"
	"time"
)

type LoginUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ForgotPasswordUser struct {
	Email   string `json:"email"`
}

type ResetPasswordUser struct {
	Token    string `json:"token"`
	Password string `json:"password"`
	Captcha  string `json:"captcha"`
}

type ForgotPasswordResponse struct {
	Status     bool   `json:"status"`
	StatusCode string `json:"statusCode"`
	Message    string `json:"message"`
}

func Landing(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	landingTemplate.Execute(w, nil)
}

func Gallery(w http.ResponseWriter, _ *http.Request, _ httprouter.Params) {
	galleryTemplate.Execute(w, nil)
}

func Redirect(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    http.Redirect(w, r, "/gallery/album", 301)
}

func Register(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	user := User{}
	err = json.NewDecoder(r.Body).Decode(&user)
	defer r.Body.Close()
	if err != nil {
		write_response(err, w, false, "Internal Server Error")
		return
	}

	user.Password = string(hashpass(user.Password)[:])

	// no clan right now, user will be allowed to choose after login
	galleryUser := User{
		Email:    user.Email,
		Password: user.Password,
		Name:     user.Name,
		Gender:   user.Gender,
	}

	tx := DB.db.Begin()

	if err = tx.Create(&galleryUser).Error; err != nil {
		tx.Rollback()
		write_response(err, w, false, "Can't register user")
		return
	}

	tx.Commit()

	write_response(nil, w, true, "Registration Successful")
	return
}

func Login(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	user := LoginUser{}

	err = json.NewDecoder(r.Body).Decode(&user)
	defer r.Body.Close()
	if err != nil {
		write_response(err, w, false, "Internal Server Error")
		return
	}

	user.Password = string(hashpass(user.Password)[:])

	currentuser := User{}
	if DB.db.Where(&user).First(&currentuser).RecordNotFound() {
		write_response(err, w, false, "Wrong Email or Password")
		return
	}

	storeuser := CurrentUser{
		ID:          currentuser.ID,
		Name:        currentuser.Name,
		Email:       currentuser.Email,
		AccessLevel: currentuser.AccessLevel,
		LoggedIn:    true,
	}
	err = SetSession(&storeuser, w)

	if err != nil {
		write_response(err, w, false, "Internal Server Error")
		return
	}

	write_response(nil, w, true, "Login Successful")
	return
}

func Logout(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	ClearSession(w)
	defer r.Body.Close()
	http.Redirect(w, r, "/login", 302)
}

func GetPlayer(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	defer r.Body.Close()

	user := User{}
	if DB.db.Select("id, name, gender, email").Where("id=?", currUser.ID).First(&user).RecordNotFound() {
		write_response(err, w, false, "Couldn't find user")
		return
	}

	out, err := json.Marshal(user)
	if err != nil {
		write_response(err, w, false, "Internal Server Error")
		return
	}

	write_response(nil, w, true, string(out))
	return
}

func ModifyPlayer(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	defer r.Body.Close()

	respUser := User{}
	err = json.NewDecoder(r.Body).Decode(&respUser)

	if err != nil {
		write_response(err, w, false, "Internal Server Error")
		return
	}

	updatedUser := User{}
	if DB.db.Where("id=?", currUser.ID).First(&updatedUser).RecordNotFound() {
		write_response(err, w, false, "Couldn't find user")
		return
	}

	updatedUser.Name = respUser.Name
	updatedUser.Gender = respUser.Gender

	tx := DB.db.Begin()
	if err = tx.Save(&updatedUser).Error; err != nil {
		tx.Rollback()
		write_response(err, w, false, "Can't update user")
		return
	}
	tx.Commit()

	write_response(nil, w, true, "")
	return

}

func ForgotPasswordHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	user := ForgotPasswordUser{}

	err = json.NewDecoder(r.Body).Decode(&user)
	defer r.Body.Close()
	if err != nil {
		write_response(err, w, false, "Internal Server Error")
		return
	}

	currentuser := User{}
	if DB.db.Select("id").Where("email=?", user.Email).First(&currentuser).RecordNotFound() {
		write_response(err, w, false, "User email isn't registered with us")
		return
	}

	forgot := ForgotPassword{
		ID:        RandStringRunes(20),
		UserID:    currentuser.ID,
		Timestamp: time.Now(),
	}

	tx := DB.db.Begin()
	if err = tx.Save(&forgot).Error; err != nil {
		tx.Rollback()
		write_response(err, w, false, "Can't update user")
		return
	}
	tx.Commit()

	// Send forgot password mail using postman
	// resp, err := http.PostForm("http://52.35.186.93:4567/resetpassword", url.Values{"email": {user.Email},
	// 	"url": {fmt.Sprintf("https://cyberhawk.iecsemanipal.com/resetpassword?token=%s", forgot.ID)}})
	// if err != nil {
	// 	panic(err)
	// }
	// defer resp.Body.Close()
	// body, err := ioutil.ReadAll(resp.Body)
	
	forgotResp := ForgotPasswordResponse{
		Status     : true,
		StatusCode : "200",
		Message    : "Message Sent",
	}
	// json.Unmarshal(body, &forgotResp)

	if forgotResp.StatusCode != "200" {
		write_response(errors.New(forgotResp.Message), w, false, "Internal server error")
		return
	}

	write_response(nil, w, true, "An email has been sent to your mail id")
	return
}

func ResetPasswordHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	user := ResetPasswordUser{}

	err = json.NewDecoder(r.Body).Decode(&user)
	defer r.Body.Close()
	if err != nil {
		write_response(err, w, false, "Internal Server Error")
		return
	}

	forgot := ForgotPassword{}
	if DB.db.Where("id=?", user.Token).First(&forgot).RecordNotFound() {
		write_response(err, w, false, "Invalid token")
		return
	}

	currentuser := User{}
	if DB.db.Where("id=?", forgot.UserID).First(&currentuser).RecordNotFound() {
		write_response(err, w, false, "User not found")
		return
	}

	currentuser.Password = string(hashpass(user.Password)[:])
	tx := DB.db.Begin()
	if err = tx.Save(&currentuser).Error; err != nil {
		tx.Rollback()
		write_response(err, w, false, "Can't update user")
		return
	}
	tx.Commit()

	tx = DB.db.Begin()
	if err = tx.Delete(&forgot).Error; err != nil {
		tx.Rollback()
		write_response(err, w, false, "Couldn't update the token")
		return
	}
	tx.Commit()

	write_response(nil, w, true, "Password has been changed")
	return
}
