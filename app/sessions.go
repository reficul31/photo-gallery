package app

import (
	b64 "encoding/base64"
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"strings"
	"time"
)

func SetSession(user *CurrentUser, w http.ResponseWriter) error {
	//return err
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":           user.ID,
		"exp":          time.Now().Add(time.Hour * 72).Unix(),
		"access_level": user.AccessLevel,
		"name":         user.Name,
	})
	tokenString, err := token.SignedString([]byte(config.SecretKey))
	if err != nil {
		return err
	}
	cookie := &http.Cookie{
		Name:   "session",
		Value:  tokenString,
		Path:   "/",
		MaxAge: 86400,
	}

	http.SetCookie(w, cookie)
	return nil
}

func SetCurrentUser(r *http.Request) bool {
	if cookie, err := r.Cookie("session"); err == nil {
		claimsArr := strings.Split(cookie.Value, ".")
		if len(claimsArr) < 2 {
			return false
		}
		claims := claimsArr[1]
		cl := jwt.MapClaims{}
		clbytes, _ := b64.StdEncoding.DecodeString(claims)
		json.Unmarshal(clbytes, &cl)
		if !tokenValid(cookie.Value, cl, config.SecretKey) {
			return false
		}
		return true
	}
	return false
}

func ClearSession(w http.ResponseWriter) {
	cookie := &http.Cookie{
		Name:   "session",
		Value:  "",
		Path:   "/",
		MaxAge: -1,
	}
	http.SetCookie(w, cookie)
}
