Read Me 

--------------
JE Cinema - Cinema Website
----------------------------

Description
--------------

JE Cinema is a website developed with HTML, Bootstrap CSS and Javascript/Jquery.
The website allows for users to pick films that they want to watch, either through search or the homepage, or manually book
then make a booking and select their seats.



Feature List
---------------
Static HTML pages (Home/About etc.) - with some dynamic elements
Book a movie
Select a seat
Mange Booking - change movie/cancel booking
Wishlist Add/Remove - View in my profile area
Login/Register
My Profile - Change user name/password/profile picture deactivate account
Password Recovery





Installation 
---------------

There are a few necessary installations to run this project

-> node js.This is installed from https://nodejs.org/en/.
-> PostgresSQL This is installed from https://www.postgresql.org/download/   

Deployment
------------
The Postgres database should be set up with the SQL file given to create all tables
The file is in the Databases folder
Using pgAdmin run this script

Run the Create Database section before the create tables part as it generates an error


AS per the .env file details ( these should obviously be kept secret )
The password should match the .env file - assignmentpassword
The port should be 5432
The host is localhost
The dbname and username is webdevassignment

If you encounter issues use your own user and password and change them in .env file to solve the issue
Otherwise a created postgres user with the provided username/password should work

To run this project you will need to access the node server first. This is done by downloading the project file,
accessing its path and changing to the project file's directory on your machine. Then to run the server type 
"node app.js". To access the homepage from here - http://localhost:3000 is typed into a web browser. All webpages can be 
accessed from the homepage. 
( cd to the project directory and then node app.js)





