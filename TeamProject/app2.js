require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');

const { body, validationResult} = require('express-validator');
const fileUpload = require('express-fileupload');

const pgp = require('pg-promise')({});
const { PreparedStatement: PS } = require('pg-promise');

const saltRounds = 10;

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

// connection = protocol://userName:password@host:port/databaseName
//const db = pgp(`postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`);
const db = pgp('postgres://webdevassignment:assignmentpassword@localhost:5432/webdevassignment');

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt")

const app = express();

app.use(passport.initialize());
//app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());

app.use(
    session({
        secret: process.env.COOKIE_KEY,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'customerEmail',
    passwordField: 'customerPassword'
  },
        function (username, password, done) 
        {
            const selectUserLogin = new PS({
                name: 'retrieve-user-same-email-password',
                text: 'SELECT email, password, phonenumber, name FROM users WHERE email = $1;',
                values: [username]
            });

            db.one(selectUserLogin)
            .then(function (row) {
                if (!row) {
                    return done(null, false, { message: "User not found." });
                }
                bcrypt.compare(
                    password,
                    row.password,
                    function (err, result) {
                        if (result == true) {
                            done(null, { id: row.email });
                        } else {
                            return done(null, false, {
                                message: "Incorrect password",
                            });
                        }
                    }
                );
            })
            .catch(function (error) {
                return done(error);
            });
    })
);


passport.serializeUser(function (user, done) {
    console.log(user.id);
    done(null, user.id);

});

passport.deserializeUser(function (id, done) {
    const findUser = new PS({
        name: "deserialize-user",
        text: "SELECT email FROM users WHERE email = $1;",
        values: [id],
    });
    let error;
    let row;
    db.one(findUser)
        .then(function (res) {
            row = res;
            console.log(res);
            console.log("User found!");
            done(error, res);
        })
        .catch(function (err) {
            error = err;
            console.log("Error happened!");
            console.log(err, row);
        });

});




app.listen(3000, function() {
    console.log('Server running on port 3000');
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/homepage.html");
});


app.get("/login", function(req, res) {	//only if not already logged in
    res.sendFile(__dirname + "/login.html");
});

//Register Form Posted
app.post('/newuser', function (req, res) 
{
    // uncoment these lines and insert your own values
    // const email = "post@post123.ie";
    // const password = "post123";
    // const name = "POST";
    // const phonenumber = "3132323223";

    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Now we can store the password hash in db.
        const insert = new PS({
            name: "insert-user",
            text:'INSERT INTO users (email, password, name, phonenumber) VALUES ($1, $2, $3, $4);',
            values: [email, hash,name,phonenumber]
        });
        db.none(insert)
            .then(function(rows){
                console.log('Success!');
        })
            .catch(function(error){
                console.log(error);
        });
    });
});    



app.post("/existinguser", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            console.log(info);
            return res.redirect("/login");
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.redirect("/home");
        });
    })(req, res, next);
});


function isAuthenticated() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    };
}

app.get("/home", function(req, res) {
    res.sendFile(__dirname + "/homepage.html");
});

app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/about.html");
});

app.get("/create-booking", isAuthenticated(), function(req, res) {
    res.sendFile(__dirname + "/create-booking.html");
});

app.get("/manage-booking", isAuthenticated(), function(req, res) {	
    res.sendFile(__dirname + "/manage-booking.html");
});

app.get("/login", function(req, res) {	//only if not already logged in
    res.sendFile(__dirname + "/login.html");
});

app.get("/register", function(req, res) {	//only if not already logged in
    //if(!isAuthenticated())
    //{
        res.sendFile(__dirname + "/register.html");
    //}    
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

app.get("/getuser/:email", function(req, res) {	//send profile info back to user
    const userEmail = req.params.email;
    //console.log(req.params);
    
    
    const selectuserdetails = new PS({
        name: 'retrieve-user-details',
        text: 'SELECT name, password, profilepicture FROM users WHERE email = $1;',
        values: [userEmail]
    });

    //Select to make sure email and password match to db
    db.one(selectuserdetails)
    .then(function(rows) {
        //console.log(rows);
        const data = {
            customerName: rows.name,
            customerPassword: rows.password,
            customerProfilePic: rows.profilepicture,
            customerEmail: userEmail
        }
        res.status(200).json(data);
        console.log(data);
    })
    .catch(function(errors) {
        console.log(errors);
        res.status(400).json(errors)
    });    
});

app.get("/my-profile", isAuthenticated(), function(req, res) {	//make conditional to login
    res.sendFile(__dirname + "/my-profile.html");
});

app.get("/select-seat", isAuthenticated(), function(req, res) {	
    res.sendFile(__dirname + "/select-seat.html")
});  





//My Profile Form Posted
app.post('/changeuser', [
    body('customerName')
    .isLength({ min: 4, max: 50 })
    .trim()
    .escape(),
    
    body('customerEmail')
        .isLength({ min: 5, max: 50 })
        .isEmail()
        .normalizeEmail(),

    body('customerPassword')
        .isLength({ min: 5, max: 50 })
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
		

        const data = {
            customerName: customerName,
            customerEmail: customerEmail,
            customerPassword: customerPassword,
        }

        console.log(`${customerName} ${customerEmail} ${customerPassword}`);
        
        
        //Check if user already exists
        const selectuser = new PS({
            name: 'retrieve-user-same-email',
            text: 'SELECT email FROM users WHERE email = $1;',
            values: [customerEmail]
        });

        //Update User
        const updateuser = new PS({
            name: 'update-user',
            
            text: 'UPDATE users password = $1, name = $2 WHERE email = $3;',
            values: [customerPassword, customerName, customerEmail]
        });


        db.one(selectuser)
        .then(function(rows) {
            db.none(updateuser)
            .then(function(rows) {
                res.status(200).json(data);
                console.log(rows);
            });
            
        })
        .catch(function(errors) {
            console.log(errors);
            res.status(400).json(errors)
        });


    }

});


//Create Booking Form Posted
app.post('/newbooking', [

    body('loginEmail')
        .isLength({ min: 5, max: 50 })
        .isEmail()
        .normalizeEmail(),

        body('customerPhone')
        .isLength({ min: 6, max: 14 })
        .isMobilePhone(),

        body('movieName')
        .isLength({ min: 5, max: 50 })
],
function(req, res) {
    const validErrors = validationResult(req);

    if (!validErrors.isEmpty()) {
        return res.status(400).json({ errors: validErrors.array() });
    } 
    else 
    {
        const movieName = req.body.movieName;
        const loginEmail = req.body.loginEmail;
        const customerPhone = req.body.customerPhone
		

        const data = {
            movieName: movieName,
            customerEmail: loginEmail,
            customerPhone: customerPhone
        }

        console.log(` ${movieName} ${loginEmail} ${customerPhone}`);
        res.json(data);
        
        
        app.get("/select-seat", function(req, res) {	//make conditional to post booking
            res.sendFile(__dirname + "/select-seat.html")
        });
        //res.sendFile(__dirname + "/select-seat.html");

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


app.post("/seatselect", function(req, res) {
    ///Data already validated from last form

    const seatsBooked = myArray = JSON.Parse(req.body.seatsBooked);
    const movieName = req.body.movieName;
    const loginEmail = req.body.loginEmail;
    const customerPhone = req.body.customerPhone;

    //Insert Booking to DB
    res.json({});
});

app.post('/my-profile', (req, res) =>   //new profile pic
{
    let fileUpload;

    fileUpload = req.files.profilepic;
    const uploadPath = __dirname +  "/public/pictures/profilepictures/" + fileUpload.name;

    //Put file on server
    
    fileUpload.mv(uploadPath, function(err)
    {
        if(err) return res.status(500).send(err);   
    });

    
    const userEmail = req.body.userEmail;

    const updatePicture = new PS({
        name: 'modify-picture',
        text: 'UPDATE users SET profilepicture = $1 WHERE email = $2;',
        values: [fileUpload.name, userEmail]
    });


    //Select to make sure user doesn't exist... if they do provide an error else register the user 

    db.none(updatePicture)
    .then(function(rows) {
        //Delay redirect to allow database to react in time for refresh
        setTimeout(function()
        {
            res.status(200).redirect('my-profile')
        },1000);
        //console.log(rows);
    })
    .catch(function(errors) {
        console.log(errors);
        res.status(400).json(errors)
    });


});