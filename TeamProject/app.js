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

const bcrypt = require("bcrypt");

const app = express();


//Movie Number -> Name Array (for easy changes in updates)
const movieNames = ["Saving Private Ryan", "The Godfather", "Paw Patrol", "The Lion King", "007: No Time to Die", "Deadly Cuts" ];
/*Use index +1 to map
  e.g movie1 = Saving Private Ryan
      movieNames[0+1] = Saving Private Ryan (movie1)
*/      


app.use(
    session({
        secret: process.env.COOKIE_KEY,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'customerEmail',
    passwordField: 'customerPassword'
  },
        function (username, password, done) 
        {
            const selectUserLogin = new PS({
                name: 'retrieve-user-same-email',
                text: 'SELECT email, password, phonenumber, name FROM users WHERE email = $1;',
                values: [username]
            });

            db.one(selectUserLogin)
            .then(function (row) {
                if (!row) {
                    return done(null, false, { message: "User not found." });
                }
                bcrypt.compare(password, row.password,
                    function (err, result) {
                        if (result == true) {
                            console.log("Correct password");
                            done(null, { id: row.email });
                        } else {
                            console.log("Incorrect password");
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
            // console.log("Error happened!");
            console.log(err, row);
        });

});

function isAuthenticated() {
    return function (req, res, next) {
        //return next();
        if (req.isAuthenticated()) {
            return next();
            
        }
        res.redirect("/login");

    };
}


//Check if movie is in wishlist
const alreadyInWishlist = new PS(
    {
        name: 'check-wishlist',
        text: 'SELECT * FROM wishlist WHERE user_email = $1 AND movie_name = $2;',
    });


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

app.get("/notimetodie", function(req, res) {
    res.sendFile(__dirname + "/notimetodie.html");
});
app.get("/savingprivateryan", function(req, res) {
    res.sendFile(__dirname + "/savingprivateryan.html");
});
app.get("/thelionking", function(req, res) {
    res.sendFile(__dirname + "/thelionking.html");
});
app.get("/pawpatrol", function(req, res) {
    res.sendFile(__dirname + "/pawpatrol.html");
});
app.get("/thegodfather", function(req, res) {
    res.sendFile(__dirname + "/thegodfather.html");
});app.get("/deadlycuts", function(req, res) {
    res.sendFile(__dirname + "/deadlycuts.html");
});
app.get("/forgotpassword", function(req, res) {
    res.sendFile(__dirname + "/forgotpassword.html");
});
app.get("/changepassword", function(req, res) {
    res.sendFile(__dirname + "/changepassword.html");
});


app.get("/create-booking", /*isAuthenticated(),*/ function(req, res) {
    res.sendFile(__dirname + "/create-booking.html");
});

app.get("/manage-booking", /*isAuthenticated(),*/ function(req, res) {	
    res.sendFile(__dirname + "/manage-booking.html");
});

app.get("/login", function(req, res) {	//only if not already logged in
    
    // if(!isAuthenticated)
    // {
        res.sendFile(__dirname + "/login.html");  //not logged in yet
    // }
    // else
    // {
    //     res.redirect("/alreadyloggedin");  //already logged in
    // }
    
});

app.get("/alreadyloggedin", function(req,res)  {
    res.sendFile(__dirname + "/alreadyloggedin.html");  //already logged in
});

app.get("/register", function(req, res) {	//only if not already logged in
    
    // if(!isAuthenticated)
    // {
        res.sendFile(__dirname + "/register.html");  //not logged in yet
    // }
    // else
    // {
    //     res.redirect("/alreadyloggedin");  //already logged in
    // }
      
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

app.get("/getuser/:email", function(req, res) {	//send profile info back to user
    const userEmail = req.params.email;
    console.log(req.params);
    
    
    const selectuserdetails = new PS({
        name: 'retrieve-user-details',
        text: 'SELECT name, profilepicture FROM users WHERE email = $1;',
        values: [userEmail]
    });

    //Select to make sure email and password match to db
    db.one(selectuserdetails)
    .then(function(rows) {
        //console.log(rows);
        const data = {
            customerName: rows.name,
            customerProfilePic: rows.profilepicture,
            customerEmail: userEmail
        }
        res.status(200).json(data);
    })
    .catch(function(errors) {
        console.log(errors);
        res.status(400).json(errors)
    });    
});



app.get("/getwishlist/:email", function(req, res) {	//send wishlist info back to user
    const userEmail = req.params.email;
    
    
    const selectuserwishlist = new PS({
        name: 'retrieve-user-wishlist',
        text: 'SELECT movie_name FROM wishlist WHERE user_email = $1;',
        values: [userEmail]
    });

    //Select to make sure email and password match to db
    db.many(selectuserwishlist)
    .then(function(rows) {
        //Save rows to array and send them in JSON object
        const data = {
            wishlist: rows
        };
        res.status(200).json(data);
    })
    .catch(function(errors) {
        console.log(errors);
         res.status(204).json(errors)
    });    
});







app.get("/getBookedMovies/:email", function(req, res) {	//send wishlist info back to user
    const userEmail = req.params.email;
    
    
    const selectbookedmovies = new PS({
        name: 'retrieve-booked-movies',
        text: 'SELECT movie_name FROM bookinginfo WHERE email = $1;',  //change table to booking table
        values: [userEmail]
    });

    //Select to make sure email and password match to db
    db.many(selectbookedmovies)
    .then(function(rows) {
        //Save rows to array and send them in JSON object
        const data = {
            bookedMovies: rows
        };
        res.status(200).json(data);
    })
    .catch(function(errors) {
        console.log("No Movies Booked for this user!");
         res.status(204).json(errors)
    });    
});




// "GET", "/getSeats/"  + movieName
app.get("/getSeats/:movieName", function(req, res) {	//send wishlist info back to user
    const movieName = req.params.movieName;
    
    const selectbookedseats = new PS({
        name: 'retrieve-booked-seats',
        text: 'select seat_no from seat_booking s INNER JOIN bookinginfo b ON b.seat_bookingid = s.seat_booking_id WHERE b.movie_name = $1;',  //get all seats booked for current movie
        values: [movieName]
    });

    // //Select to make sure email and password match to db
    db.any(selectbookedseats)
    .then(function(rows) {
        //Save rows to array and send them in JSON object
        const data = {
            rows
        };
        res.status(200).json(data);
    })
    .catch(function(errors) {
        console.log(errors);
         res.status(204).json(errors)
    });    
});








app.get("/my-profile", /*isAuthenticated(),*/ function(req, res) {	//make conditional to login
    res.sendFile(__dirname + "/my-profile.html");
});

app.get("/select-seat", isAuthenticated(), function(req, res) {	
    res.sendFile(__dirname + "/select-seat.html")
});  


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
		
		
		bcrypt.hash(customerPassword, saltRounds, function (err, hash) {
        // Now we can store the password hash in db.
        const insertuser = new PS({
            name: "new-user",
            text:'INSERT INTO users (email, password, name, phonenumber) VALUES ($1, $2, $3, $4);',
            values: [customerEmail, hash, customerName, customerPhone]
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
                res.status(400).json(errors);
            })
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
function(req, res, next) {
    const validErrors = validationResult(req);

    if (!validErrors.isEmpty()) {
        console.log(validErrors);
        return res.status(401).json({ errors: validErrors.array() });
    } 
    else 
    {
        const customerEmail = req.body.customerEmail;

        //Take user details to display user details in my profile using session varibales
        const selectUserLogin = new PS({
            name: 'retrieve-user-same-email-password',
            text: 'SELECT email, phonenumber, name, profilepicture FROM users WHERE email = $1;',
            values: [customerEmail]
        });


        db.one(selectUserLogin)
        .then(function(rows) {
             data = {
                customerEmail: customerEmail,
                customerPhone: rows.phonenumber,
                customerName: rows.name,
                customerProfilePic: rows.profilepicture
            }
            awaitAuthenticate(data);
            
        })
        .catch(function(errors) {
            console.log("Wrong Username/Password entered");
            res.status(401).json(errors)
        });  
        
        function awaitAuthenticate(data)  //run from inside db query as it is async and causes undefined to be returned on occassions (too slow)
        {
            passport.authenticate('local', function(err, user, info) 
            {
                console.log(data);
                if (err) { return res.status(401).send("HHH"); }  //user doesn't exist
                if (!user) { return res.status(401).send("HHHHHH"); }  //wrong password
                
                req.logIn(user, function(err) {
                if (err) { return res.status(401).send("LLL"); } 
                return res.json(data).status(200);  //right password
                });
            })(req, res, next);

        }    


        
    };
      
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
        
        bcrypt.hash(customerPassword, saltRounds, function (err, hash) 
        {
            //Check if user already exists
            const selectuser = new PS(
            {
                name: 'retrieve-user-same-email',
                text: 'SELECT email FROM users WHERE email = $1;',
                values: [customerEmail]
            });

            //Update User
            const updateuser = new PS(
            {
                name: 'update-user',
                
                text: 'UPDATE users SET password = $1, name = $2 WHERE email = $3;',
                values: [hash, customerName, customerEmail]
            });


            db.one(selectuser)
            .then(function(rows) 
            {
                db.none(updateuser)
                .then(function(rows) 
                {
                    res.status(200).json(data);
                    console.log(rows);
                });
                
            })
            .catch(function(errors) 
            {
                console.log("errors");
                res.status(400).json(errors)
            });

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
        console.log(data);
        res.json(data);
        
        
        app.get("/select-seat", function(req, res) {	//make conditional to post booking
            res.sendFile(__dirname + "/select-seat.html")
        });
    }

});


app.post("/seatselect", function(req, res) {
    ///Data already validated from last form
    const seatsBooked = req.body.seatsBooked;
    const movieName = req.body.movieName;
    const loginEmail = req.body.loginEmail;
    // const customerPhone = req.body.customerPhone;
    
    //Insert Booking to DB
    const insertbooking = new PS({
        name: "insert-booking",
        text:'INSERT INTO bookinginfo (email, movie_name) VALUES ($1, $2) RETURNING seat_bookingid;',  //return the id for use with seat booking
        values: [loginEmail, movieName]
    });   
    
    //Take row retuned from insert for use with value in book seats

    const bookseats = new PS({
        name: "book-seats",
        text:'INSERT INTO seat_booking (seat_booking_id, email, seat_no) VALUES ($1,$2,$3);'
    }); //value of ID returned to be entered
    

    /* Inserting aysncronusly causes errors such as the same seat to be entered twice while some missed
       inserting all the seats with thei respective email and ID allow them all to be inserted once instead of in a loop error-free 
    */
    db.one(insertbooking)
    .then(function(rows)
    {
        const seatBookingID = rows.seat_bookingid;  //Create an array of seats booked
        var values = [];  //create an array...each element is used as the values to be put in the insertion statement
        
        for(let i=0; i<seatsBooked.length;i++)
        {
            values.push( [ seatBookingID, loginEmail, seatsBooked[i] ] );  //add elements into the value array
        }


        /* Updating the values for each insert in a loop caused an error of duplicate and missing values
           making this a function offsets this issue (workaround for async problem)  */
        for(let i=0; i<values.length;i++)
        {
            insertMultipleSeats(values[i]);  //call the insert seat function as it avoids errors
        } 

        function insertMultipleSeats(values)
        {
            db.none(bookseats , values)
            .then(function(rows)
            {
                console.log("Seat Booked Successfully");
                
            })
            .catch(function(errors)
            {
                res.status(400).json({});
                console.log(errors);
            });
        }

        
    })
    .catch(function(errors)
    {
        res.status(400).json({});
        console.log(errors);
    });

    res.status(200).json({});

    //Redirect to Success Page
    app.get("/booking-success", function(req,res)  {
        res.sendFile(__dirname + "/booking-success.html");  //already logged in
    });  //only allow this page after success

    
    



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
            res.status(400).redirect('my-profile')
        },1000);
        //console.log(rows);
    })
    .catch(function(errors) {
        console.log(errors);
        res.status(400).json(errors)
    });


});


//Deactivate account requested
app.post('/deactivate-account', function(req,res)
{
    const customerEmail = req.body.deactivateEmail;

    if(customerEmail !== null || customerEmail !== undefined)
    {
        
        req.logout();  //Logout User before it is impossible to de-authenticate
        console.log("TEST"+req.isAuthenticated());
        //Delete user from database
        const deleteuser = new PS(
            {
                name: 'delete-user',
                text: 'DELETE FROM users WHERE email = $1;',
                values: [customerEmail]
            });

            //Release foreign key constraint of wishlist to avoid errors
            const deletewishlist = new PS(
                {
                    name: 'delete-user-wishlist',
                    text: 'DELETE FROM wishlist WHERE user_email = $1;',
                    values: [customerEmail]
                });
            
            db.none(deletewishlist)
            .then(function(rows)
            {    
                db.none(deleteuser)
                .then(function(rows) 
                {
                    res.status(200).json({});  //to properly delete user from sesssions
                    console.log("User " + customerEmail + " deleted");
                })
                .catch(function(errors) 
                {
                    console.log(errors);
                    res.status(400).json(errors)
                });
            })
            .catch(function(errors)
            {
                console.log(errors);
            });        
    }
    else
    {
        console.log("User undefined/null trying to delete");
    }

});


//Add to Wishlist Posted
app.post('/addwishlist', function(req,res)
{
    const customerEmail = req.body.email;
    let movie = req.body.movie;  //  "movie(num)"
    let movieNumberStr = movie.replace('movie','');  //just leave number without string
    
    movieNumber = parseInt(movieNumberStr);
    movieNumber = movieNumber - 1 //to suit 0-indexed array
    movie = movieNames[movieNumber];

    if(customerEmail !== null || customerEmail !== undefined)
    {
        //Check if already in wishlist
        alreadyInWishlist.values = [customerEmail, movie];  //Already declared statement at start of program... adding values

        //Insert item to wishlist
        const addwishlist = new PS({
            name: "add-wishlist",
            text:'INSERT INTO wishlist (movie_name, user_email) VALUES ($1, $2);',
            values: [movie ,customerEmail]
        });   


        db.none(alreadyInWishlist)  //expect movie to not be in wishlist and send an error it if it is
        .then(function(rows) 
        {
            db.none(addwishlist)
            .then (function(rows) {
                const message = {
                    message: "Add to wishlist successful"
                };
                console.log(message);
            })  //end inner then
            .catch(function(rows)  {
                const message = {
                    message: "Error adding movie to wishlist"
                };
                console.log(message);
            })  //end inner catch

        })  //end outer then
        .catch(function(errors)  //if it is the wishlist -> send error
        {
            console.log(errors);
            const message = {
                message: "Item already in Wishlist!"
            }
            console.log(message);
        });
        

    }  //end if
});


//Remove from wishlist posted
app.post('/removewishlist', function(req,res)
{
    const customerEmail = req.body.email;
    let movie = req.body.movie;  //  "movie(num)"
    let movieNumberStr = movie.replace('movie','');  //just leave number without string
    
    movieNumber = parseInt(movieNumberStr);
    movieNumber = movieNumber - 1 //to suit 0-indexed array
    movie = movieNames[movieNumber];

    if(customerEmail !== null || customerEmail !== undefined)
    {
        //Check if already in wishlist
        alreadyInWishlist.values = [customerEmail, movie];  //Already declared statement at start of program... adding values

        //Delete item from wishlist
        const removewishlist = new PS(
            {
                name: 'remove-wishlist',
                text: 'DELETE FROM wishlist WHERE user_email = $1 AND movie_name = $2;',
                values: [customerEmail, movie]
            });



        db.one(alreadyInWishlist)  //expect movie to be in wishlist and try remove it if it is
        .then(function(rows) 
        {
            db.none(removewishlist)
            .then (function(rows) {
                const message = {
                    message: "Remove from wishlist successful"
                };
                console.log(message);
            })  //end inner then
            .catch(function(rows)  {
                const message = {
                    message: "Error Removing movie from wishlist"
                };
                console.log(message);
            })  //end inner catch

        })  //end outer then
        .catch(function(errors)  //if it isn't the wishlist -> send error
        {
            const message = {
                message: "Item not already in Wishlist!"
            }
            console.log(message);
        });
        

    }  //end if
});
