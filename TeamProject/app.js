const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "jecinema",
  password: "jecinemaadmin",
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

app.get("/select-seat", function(req, res) {
    res.sendFile(__dirname + "/select-seat.html");
});

/*
app.post('/newuser',function(req,res)
{
    console.log(req);
});
*/


app.post('/newuser', [
    body('customer_name')
    .isLength({ min: 4, max: 50 })
    .trim()
    .escape(),
    
    body('customer_email')
        .isLength({ min: 5, max: 50 })
        .isEmail()
        .normalizeEmail(),
    
    body('customer_password')
        .isLength({ min: 5, max: 50 }),

    body('customer_contactphone')
        .isLength({ min: 6, max: 14 })
        .isMobilePhone()
],
function(req, res) {
    const validErrors = validationResult(req);

    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        return res.status(400).json({ errors: validErrors.array() });
    } else {
        const customerName = req.body.customer_name;
        const customerEmail = req.body.customer_email;
        const customerPassword = req.body.customer_password;
        const customerPhone = req.body.customer_contactphone;
        console.log(req.body.customerEmail);
        console.log(`${customerName} ${customerEmail}, ${customerPassword}, ${customerPhone}`);
        const insert = db.prepare('INSERT INTO users (customerName, customerEmail, customerPassword, CustomerPhone) VALUES ($1, $2, $3,$4);');
        insert.run(customerName, customerEmail, customerPassword, customerPhone);
        insert.finalize();

        //const query = db.prepare('SELECT id, fName, lName, email FROM subscribers ORDER BY id DESC LIMIT 5;');
        // query.all - will return all rows, expects at least 1 or more
        // query.any - will return all rows, expects 0 or more
        // query.get - will return the first row only, expects a single row
        
        //Check if user already exists
        query.any(function(error, rows) {
            if (error) {
                console.log(error);
                res.status(400).json(error);
            } else {
                console.log(rows);
                res.status(200).json(rows);
            }
        });
    }

    //res.json(`${customerName} ${customerEmail}, ${customerPassword}, ${customerPhone}`);
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