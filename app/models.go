package app

import "time"

// Photo describes the photo structure
type Photo struct {
	ID          int       `json:"id" sql:"AUTO_INCREMENT" gorm:"primary_key"`
	Description string    `json:"description" sql:"not null"`
	Created     time.Time `json:"created, omitempty" sql:"not null;DEFAULT:current_timestamp"`
	Privacy     int       `json:"privacy" sql:"not null; DEFAULT:0"`
	Likes       int       `json:"likes" sql:"DEFAULT:0"`
}

// Album describes the album structure
type Album struct {
	ID          int       `json:"id" sql:"AUTO_INCREMENT" gorm:"primary_key"`
	Description string    `json:"description" sql:"not null"`
	Created     time.Time `json:"created, omitempty" sql:"not null;DEFAULT:current_timestamp"`
	Photos      []Photo   `json:"photos"`
	Privacy     int       `json:"privacy" sql:"not null; DEFAULT:0"`
	Likes       int       `json:"likes" sql:"DEFAULT:0"`
}

// User describes the user structure
type User struct {
	ID       int    `json:"id" sql:"AUTO_INCREMENT" gorm:"primary_key"`
	Name     string `json:"name" sql:"not null"`
	Email    string `json:"email" sql:"not null;unique"`
	Password string `json:"password,omitempty" sql:"type:binary(20);not null"`
	Gender   string `json:"gender, omitempty"`
	Profile  string `json:"profile"`
}
