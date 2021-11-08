const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "SYS",
  password: "Sxyp8554?",
  database: "jecinema"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.listen(3000, function() {
    console.log('Server running on port 3000');
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/homepage.html");
});

app.get("/home", function(req, res) {
    res.sendFile(__dirname + "/homepage.html");
});

app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/about.html");
});

app.get("/create-booking", function(req, res) {
    res.sendFile(__dirname + "/create-booking.html");
});

app.get("/manage-booking", function(req, res) {
    res.sendFile(__dirname + "/manage-booking.html");
});

app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.get("/register", function(req, res) {
    res.sendFile(__dirname + "/register.html");
});

app.get("/my-profile", function(req, res) {
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