-- Database: webdevassignment

-- DROP DATABASE IF EXISTS webdevassignment;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS seat_booking CASCADE;
DROP TABLE IF EXISTS booking CASCADE;

/*
CREATE DATABASE webdevassignment
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Ireland.1252'
    LC_CTYPE = 'English_Ireland.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	*/
	
CREATE TABLE users (
	email VARCHAR ( 50 ) PRIMARY KEY,
	password VARCHAR ( 50 ) NOT NULL,
	name VARCHAR (50) NOT NULL,
	phonenumber VARCHAR (50) NOT NULL,
	profilepicture VARCHAR (100) NULL
);

CREATE TABLE seat_booking (
	seat_booking_id NUMERIC (3) NOT NULL,
	email VARCHAR (50) UNIQUE NOT NULL,
	seat_no NUMERIC (3) UNIQUE NOT NULL,
	
	CONSTRAINT fk_email
	  FOREIGN KEY(email) 
	  	REFERENCES users(email)
);

CREATE TABLE booking (
	email VARCHAR ( 50 ) UNIQUE PRIMARY KEY,
	movie_name VARCHAR (50) NOT NULL,
	seat_booking_id NUMERIC (3) NOT NULL,
	
	CONSTRAINT fk_email
	  FOREIGN KEY(email) 
	  	REFERENCES seat_booking(email)
	
);

select * from users;
SELECT email FROM users WHERE email = 'testuser';

