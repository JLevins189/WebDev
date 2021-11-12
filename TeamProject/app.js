const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult} = require('express-validator');

/*const pgp = require('pg-promise')({});
const { PreparedStatement: PS } = require('pg-promise');
// connection = protocol://userName:password@host:port/databaseName
const db = pgp('postgres://webdevassignment:assignmentpassword@localhost:5432/webdevassignment');
*/
const app = express();
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

app.get("/login", function(req, res) {	//make conditional to login
    res.sendFile(__dirname + "/login.html");
});

app.get("/register", function(req, res) {	//make conditional to login
    res.sendFile(__dirname + "/register.html");
});

app.get("/my-profile", function(req, res) {	//make conditional to login
    res.sendFile(__dirname + "/my-profile.html");
});

app.get("/select-seat", function(req, res) {	//make conditional to post booking
    res.sendFile(__dirname + "/select-seat.html")
});  //only till testing finished


//Register Form Posted
app.post('/newuser', [
    body('customerName')
    .isLength({ min: 4, max: 50 })
    .trim()
    .escape(),
    
    body('customerEmail')
        .isLength({ min: 5, max: 50 })
        .isEmail()
        .normalizeEmail(),

    body('customerPassword')
        .isLength({ min: 5, max: 50 }),

    body('customerPhone')
        .isLength({ min: 6, max: 14 })
        .isMobilePhone()
],
function(req, res) {
    const validErrors = validationResult(req);

    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        return res.status(400).json({ errors: validErrors.array() });
    } 
    else 
    {
        const customerName = req.body.customerName;
        const customerEmail = req.body.customerEmail;
        const customerPassword = req.body.customerPassword;
        const customerPhone = req.body.customerPhone;
		

        const data = {
            customerName: customerName,
            customerEmail: customerEmail,
            customerPassword: customerPassword,
            customerPhone: customerPhone
        }

        console.log(`${customerName} ${customerEmail} ${customerPassword} ${customerPhone}`);
        console.log(data);
        res.json(data);

        //const insert = db.prepare('INSERT INTO users (customerName, customerEmail, customerPassword, CustomerPhone) VALUES ($1, $2, $3,$4);');
        //insert.run(customerName, customerEmail, customerPassword, customerPhone);
        //insert.finalize();

        //const query = db.prepare('SELECT id, fName, lName, email FROM subscribers ORDER BY id DESC LIMIT 5;');
        // query.all - will return all rows, expects at least 1 or more
        // query.any - will return all rows, expects 0 or more
        // query.get - will return the first row only, expects a single row
        
        //Check if user already exists
        
        /*query.any(function(error, rows) {
            if (error) {
                console.log(error);
                res.status(400).json(error);
            } else {
                console.log(rows);
                res.status(200).json(rows);
            }
        });*/
    }

});
