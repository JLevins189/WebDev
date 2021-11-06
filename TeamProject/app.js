const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.listen(3000, function() {
    console.log('Server running on port 3000');
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/homepage.html");
});

app.get("/homepage.html", function(req, res) {
    res.sendFile(__dirname + "/homepage.html");
});

app.get("/about.html", function(req, res) {
    res.sendFile(__dirname + "/about.html");
});

app.get("/create-booking.html", function(req, res) {
    res.sendFile(__dirname + "/create-booking.html");
});

app.get("/manage-booking.html", function(req, res) {
    res.sendFile(__dirname + "/manage-booking.html");
});

app.get("/login.html", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.get("/register.html", function(req, res) {
    res.sendFile(__dirname + "/register.html");
});

app.get("/my-profile.html", function(req, res) {
    res.sendFile(__dirname + "/my-profile.html");
});


//Example Below of post
app.post("/sum", function(req, res) {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    console.log(req.body);
    // const result = num1 + num2;
    console.log(num1 + num2);
    const result = {
        result: num1 + num2
    };
    res.json(result);
});


/*
//Make Connection to SQL
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

*/