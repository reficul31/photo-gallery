package app

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

/*
Used to read the configuration file config.json which stores the app configurations
*/

//Configuration Stores the main configurations for the application
type Configuration struct {
	ServerAddr         string `json:"server_addr"`
	DBUsername         string `json:"db_user"`
	DBPassword         string `json:"db_password"`
	DBName             string `json:"db_name"`
	TemplateRoot       string `json:"template_root"`
	SecretKey          string `json:"secret_key"`
	EncryptionKey      string `json:"encryption_key"`
	DataSiteKey        string `json:"datasite-key"`
	EncryptAnswer      bool   `json:"encrypt_answer"`
	MinEncryptionLevel int    `json:"min_encryption_level"`
	DbLog              bool   `json:"db_log"`
}

var config Configuration

//ReadConfig will read the configuration json file to read the parameters
//which will be passed in the config file
func ReadConfig(fileName string) (Configuration, error) {
	configFile, err := ioutil.ReadFile(fileName)

	if err != nil {
		log.Print("Unable to read config file, switching to flag mode")
		return Configuration{}, err
	}
	//log.Print(configFile)
	err = json.Unmarshal(configFile, &config)
	if err != nil {
		log.Print("Invalid JSON, expecting port from command line flag")
		return Configuration{}, err
	}
	return config, nil
}
