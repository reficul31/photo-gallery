package app

import (
	"crypto/sha1"
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"
)

var replacer = strings.NewReplacer("_", "")

type Response struct {
	Success bool   `json:"success"`
	Data    string `json:"data"`
}

var src = rand.NewSource(time.Now().UnixNano())

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const (
	letterIdxBits = 6                    // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
	letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
)

func RandStringRunes(n int) string {
	b := make([]byte, n)
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return string(b)
}

func hashpass(pass string) []byte {
	h := sha1.New()
	io.WriteString(h, (pass + config.SecretKey))

	return h.Sum(nil)
}

//@todo log errors to a file
func write_response(err error, w http.ResponseWriter, success bool, data string) {
	res := Response{
		Success: success,
		Data:    data,
	}

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	} else {
		w.WriteHeader(http.StatusCreated)
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")

	if err := json.NewEncoder(w).Encode(res); err != nil {
		log.Println(err)
	}
}

func tokenValid(myToken string, claims jwt.MapClaims, myKey string) bool {
	token, err := jwt.ParseWithClaims(myToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(myKey), nil
	})

	if err == nil && token.Valid {
		currUser.ID = int(claims["id"].(float64))
		currUser.AccessLevel = int(claims["access_level"].(float64))
		currUser.Name = claims["name"].(string)
		return true
	} else {
		return false
	}
}
