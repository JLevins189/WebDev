const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult} = require('express-validator');
const fileUpload = require('express-fileupload');

const pgp = require('pg-promise')({});
const { PreparedStatement: PS } = require('pg-promise');
// connection = protocol://userName:password@host:port/databaseName
const db = pgp('postgres://webdevassignment:assignmentpassword@localhost:5432/webdevassignment');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());


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

app.get("/getuser/:email", function(req, res) {	//send profile info back to user
    const userEmail = req.params.email;
    console.log(req.params);
    //Check if user already exists
    
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

/*app.get("/my-profile", function(req, res) {	//make conditional to login
    res.sendFile(__dirname + "/my-profile.html");
});*/

/*app.get("/select-seat", function(req, res) {	//make conditional to post booking
    res.sendFile(__dirname + "/select-seat.html")
});  //only till testing finished*/


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
        
        
        //Check if user already exists
        const selectuser = new PS({
            name: 'retrieve-user-same-email',
            text: 'SELECT email FROM users WHERE email = $1;',
            values: [customerEmail]
        });

        //Insert User
        const insertuser = new PS({
            name: 'new-user',
            text: 'INSERT INTO users (email, password, name, phonenumber) VALUES ($1, $2, $3, $4);',
            values: [customerEmail, customerPassword, customerName, customerPhone]
        });


        //Select to make sure user doesn't exist... if they do provide an error else register the user 
        db.none(selectuser)
        .then(function(rows) {
            db.none(insertuser)
            .then(function(rows) {
                console.log(rows);
            });
            res.status(200).json(data);
        })
        .catch(function(errors) {
            console.log(errors);
            res.status(400).json(errors)
        });
    }

});


//Login Form Posted
app.post('/existinguser', [

    body('customerEmail')
        .isLength({ min: 5, max: 50 })
        .isEmail()
        .normalizeEmail(),

    body('customerPassword')
        .isLength({ min: 5, max: 50 }),

],
function(req, res) {
    const validErrors = validationResult(req);

    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        return res.status(400).json({ errors: validErrors.array() });
    } 
    else 
    {
        const customerEmail = req.body.customerEmail;
        const customerPassword = req.body.customerPassword;
		

        const data = {
            customerEmail: customerEmail,
            customerPassword: customerPassword,
        }


        //Check if user already exists
        const selectuserlogin = new PS({
            name: 'retrieve-user-same-email-password',
            text: 'SELECT email, password, phonenumber, name FROM users WHERE email = $1 AND password = $2;',
            values: [customerEmail, customerPassword]
        });


        //Select to make sure email and password match to db
        db.one(selectuserlogin)
        .then(function(rows) {
            const data = {
                customerEmail: rows.email,
                customerName: rows.name,
                customerPhone: rows.phonenumber
            }
            console.log(rows);
            res.status(200).json(data);
            
            //Allow user to be redirected to my profile on login
            app.get("/my-profile", function(req, res) {	//make conditional to login
                res.sendFile(__dirname + "/my-profile.html");
            });
        })
        .catch(function(errors) {
            console.log(errors);
            res.status(400).json(errors)
        });

    }
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
        const oldEmail = req.body.oldEmail;
		

        const data = {
            customerName: customerName,
            customerEmail: customerEmail,
            customerPassword: customerPassword,
            oldEmail: oldEmail
        }

        console.log(`${customerName} ${customerEmail} ${customerPassword} ${oldEmail}`);
        
        
        //Check if user already exists
        const selectuser = new PS({
            name: 'retrieve-user-same-email',
            text: 'SELECT email FROM users WHERE email = $1;',
            values: [oldEmail]
        });

        //Insert User
        const updateuser = new PS({
            name: 'update-user',
            
            text: 'UPDATE users SET email = $1, password = $2, name = $3 WHERE email = $4;',
            values: [customerEmail, customerPassword, customerName, oldEmail]
        });


        db.one(selectuser)
        .then(function(rows) {
            db.none(insertuser)
            .then(function(rows) {
                console.log(rows);
            });
            res.status(200).json(data);
        })
        .catch(function(errors) {
            console.log(errors);
            res.status(400).json(errors)
        });



        //Select to make sure user doesn't exist... if they do provide an error else register the user 
        db.one(selectuser)
        .then(function(rows) 
        {
            db.none(updateuser)
            .then(function(rows) 
            {
                console.log(rows);
            })
            .catch(function(errors) 
            {
                console.log(errors);
                res.status(400).json(errors)
            })

            res.status(200).json(data);

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
        res.sendFile(__dirname + "/select-seat.html");
        //res.json(data);

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
        //res.status(200);
        setTimeout(function(){res.status(200).redirect('my-profile')},1000);
        //console.log(rows);
    })
    .catch(function(errors) {
        console.log(errors);
        res.status(400).json(errors)
    });

    


});