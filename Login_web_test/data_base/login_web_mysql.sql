CREATE DATABASE `test1db` 
/*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

CREATE TABLE information(
	ID int(10) NOT NULL AUTO_INCREMENT,
	First_Name char(30) DEFAULT NULL,
	Last_Name char(30) DEFAULT NULL,
	Age varchar(100) DEFAULT '0',
	Sex varchar(100) DEFAULT " ",
	User varchar(45) DEFAULT NULL,
	Password varchar(100) DEFAULT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE login(
	VIP varchar(3) DEFAULT NULL,
	User char(40) NOT NULL,
	Password int(11) NOT NULL
)