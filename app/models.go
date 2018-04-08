package app

import (
	"time"
)

// User describes the user structure
type User struct {
	ID          int     `json:"id" sql:"AUTO_INCREMENT" gorm:"primary_key"`
	Name        string  `json:"name" sql:"not null"`
	Email       string  `json:"email" sql:"not null;unique"`
	Password    string  `json:"password,omitempty" sql:"type:binary(20);not null"`
	Gender      string  `json:"gender, omitempty"`
	Profile     string  `json:"profile"`
	AccessLevel int     `json:"access_level,omitempty" sql:"not null;DEFAULT:0"`
	Albums      []Album `json:"albums,omitempty"`
}

type Users []User

// Photo describes the photo structure
type Photo struct {
	ID          int       `json:"id" sql:"AUTO_INCREMENT" gorm:"primary_key"`
	AlbumID     uint      `json:"album_id" sql:"not null"`
	Name        string    `json:"name" sql:"not null; unique"`
	Description string    `json:"description" sql:"not null"`
	Created     time.Time `json:"created, omitempty" sql:"not null;DEFAULT:current_timestamp"`
	Privacy     int       `json:"privacy" sql:"not null; DEFAULT:0"`
	Likes       int       `json:"likes" sql:"DEFAULT:0"`
}

type Photos []Photo

// Album describes the album structure
type Album struct {
	ID          int       `json:"id" sql:"AUTO_INCREMENT" gorm:"primary_key"`
	UserID      uint      `json:"user_id" sql:"not null"`
	Name        string    `json:"name" sql:"not null"`
	Description string    `json:"description" sql:"not null"`
	Created     time.Time `json:"created, omitempty" sql:"not null;DEFAULT:current_timestamp"`
	Photos      []Photo   `json:"photos"`
	Privacy     int       `json:"privacy" sql:"not null; DEFAULT:0"`
	Likes       int       `json:"likes" sql:"DEFAULT:0"`
}

type Albums []Album

type ForgotPassword struct {
	ID        string    `json:"id" gorm:"primary_key"`
	UserID    int       `json:"user_id" sql:"not null"`
	Timestamp time.Time `json:"timestamp" sql:"not null;DEFAULT:current_timestamp"`
}

type CurrentUser struct {
	ID          int    `json:"id,omitempty"`
	Name        string `json:"name,omitempty"`
	Email       string `json:"email,omitempty"`
	AccessLevel int    `json:"access_level,omitempty"`
	LoggedIn    bool   `json:"logged_in,omitempty"`
}