
$(document).ready(function() 
{
    $(function () {
		checkLogin(); //set as logged in/guest
		$(".poster1").click(function() 
		{
			whatsOnMovie1();
			
		});
		$(".poster2").click(function ()
		{
			whatsOnMovie2();
		});


		$(".poster3").click(function() 
		{
			whatsOnMovie3();
		});

		$(".poster4").click(function() 
		{
			whatsOnMovie4();
		});

		$(".poster5").click(function() 
		{
			whatsOnMovie5();
		});

		$(".poster6").click(function() 
		{
			whatsOnMovie6();
		});
		//On Click functions for wishlist if logged in
		if(sessionStorage.getItem("user-email") !== null)  //if user logged in allow wishlist buttons and populate them
		{
			getWishlistFromDatabase();
			$("#favourite1").click(function() {  
				favourite1();
			});
			$("#favourite2").click(function() {  
				favourite2();
			});
			$("#favourite3").click(function() {  
				favourite3();
			});
			$("#favourite4").click(function() {  
				favourite4();
			});
			$("#favourite5").click(function() {  
				favourite5();
			});
			$("#favourite6").click(function() {  
				favourite6();
			});															

		}
		else  // if not logged in
		{
			//Use classes to remove all love hearts	
			$(".favourites").hide();
			//Add text to say it availible to logged in users
		}

	});

	
	$('#search').click(function() { 
		let searchInput = $('#searchIn').val();
		let movieArray = [];
		movieArray.push('savingprivateryan');
		movieArray.push('thegodfather');
		movieArray.push('pawpatrol');
		movieArray.push('thelionking');
		movieArray.push('notimetodie');
		movieArray.push('deadlycuts');
		console.log('hello');
		console.log(searchInput);
		let searchInputCleaned = searchInput.replace(/[^A-Z0-9]/ig, '').toLowerCase();
		console.log(searchInputCleaned);

		if(jQuery.inArray(searchInputCleaned, movieArray) !== -1) {
			console.log("is in array");
			window.open("http://localhost:3000/" + searchInputCleaned, '_self');
		} else {
			console.log("is not in array");
		}

	});

});	


/*  Get movie name from the click of their poster in the what's on page
	Bring the user to the booking page with that movie pre selected	*/

function whatsOnMovie1()
{
	let movie1 = $("#movie1").text();
	sessionStorage.setItem("movie-selected", movie1);
	window.location.href = "create-booking";	
}	


function whatsOnMovie2()
{
	let movie2 = $("#movie2").text();
	sessionStorage.setItem("movie-selected", movie2);
	window.location.href = "create-booking";	
}	


function whatsOnMovie3()
{
	let movie3 = $("#movie3").text();
	sessionStorage.setItem("movie-selected", movie3);
	window.location.href = "create-booking";	
}	


function whatsOnMovie4()
{
	let movie4 = $("#movie4").text();
	sessionStorage.setItem("movie-selected", movie4);
	window.location.href = "create-booking";	
}	


function whatsOnMovie5()
{
	let movie5 = $("#movie5").text();
	sessionStorage.setItem("movie-selected", movie5);
	window.location.href = "create-booking";	
}	


function whatsOnMovie6()
{
	let movie6 = $("#movie6").text();
	sessionStorage.setItem("movie-selected", movie6);
	window.location.href = "create-booking";	
}	




function setProfilePhoto()
{
	if(sessionStorage.getItem("user-picture") !== null)
	{
		//Set Picture to user's profile picture 
		const profilePicture = sessionStorage.getItem("user-picture");
		$("#user-picture").attr("src",profilePicture);
	}
	else
	{
		$("#user-picture").attr("src", "pictures/profilepic.jpg");  //Revert to default image
	}

}


function checkLogin()
{
    if(sessionStorage.getItem("user-email") !== null)  //if user logged in
    {
        //Change Register Option to My profile
        $("#sign-in").text("My Profile").attr("id","my_profile").attr("href", "my-profile");

        //Change Login Option to Log out
        $("#register").text("Log Out").attr("href", "logout").attr("id","logout_button"); //javascript void prevents redirect on link press (handled in function instead ) 
        
        //Set Profile Picture if logged in
        setProfilePhoto();
    }
    else  //if user is not logged in
    {
        //Reverse changes to options above  if needed
        if( $("#logout_button").text() === "" || $("#logout_button").text() === null)  //revert to guest view
        {
            //Change Log out to Login
            $("#my-profile").text("Sign In").attr("id", "sign-in").attr("href", "login");

            //Change My Profile Option to Register
            $("#logout-button").text("Register").attr("id", "register").attr("href", "register");
                    
            //Set Profile Picture to default
            setProfilePhoto();
        }

    }
}


//Add To Wishlist

/*Takes in the posted data including the movie number
  decides based off movie number which image to change
  **Prevents multiple functions**/
function handleAddWishlistDone(data)  
{
	const movieWishlist = data.movie;
	let movieNumber = movieWishlist.replace('movie','');
	let elementToEdit = "#favourite" + movieNumber;
	$(elementToEdit).attr('src', 'pictures/full_heart.png');
}

function handleAddWishlistFail()
{
	alert("Error in adding to wishlist");
	console.log("Failed to add to wishlist");
}


//Remove from wishlist

/*Takes in the posted data including the movie number
  decides based off movie number which image to change
  **Prevents multiple functions**/
function handleRemoveWishlistDone(data)
{
	const movieWishlist = data.movie;
	let movieNumber = movieWishlist.replace('movie','');
	console.log(movieNumber);  //remove after testing
	let elementToEdit = "#favourite" + movieNumber;
	$(elementToEdit).attr('src', 'pictures/empty_heart.png');
}


function handleRemoveWishlistFail()
{
	alert("Error in removing from wishlist");
	console.log("Failed to remove wishlist");
}


function favourite1()
{
	if($('#favourite1').attr('src') === 'pictures/empty_heart.png') 
	{
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie1"
		};
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else 
	{
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie1"
		};
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
		
	}
}


function favourite2() 
{ 
	if($('#favourite2').attr('src') === 'pictures/empty_heart.png') {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie2"
		};
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie2"
		};
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
}


function favourite3() 
{
	if($('#favourite3').attr('src') === 'pictures/empty_heart.png') {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie3"
		};
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie3"
		};
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
}


function favourite4() 
{
	if($('#favourite4').attr('src') === 'pictures/empty_heart.png') {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie4"
		};
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie4"
		};
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
}


function favourite5() 
{ 
	if($('#favourite5').attr('src') === 'pictures/empty_heart.png') {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie5"
		};
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie5"
		};
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
}


function favourite6()
{ 
	if($('#favourite6').attr('src') === 'pictures/empty_heart.png') 
	{
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie6"
		};
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else 
	{
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie6"
		};
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
}



//Populate all values with values from the DB for logged in user
function getWishlistFromDatabase() 
{
	const userEmail = sessionStorage.getItem("user-email");

	if(userEmail !== undefined || userEmail !== null)
	{
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "/getwishlist/"  + userEmail); //+ sessionStorage.getItem("user-email"));
		xhttp.send();
		xhttp.onload = function() 
		{  	//when response received
			/*change wishlist pictures to db values, using session variables to carry across pages*/
			const response = JSON.parse(xhttp.response);  //response as JSON obj
			const wishlist = response.wishlist;
			
			sessionStorage.setItem("user-wishlist", JSON.stringify(wishlist));  //for use in my profile area
			let elementToEdit;
			
			for (var i = 0; i < wishlist.length; i++) 
			{
				for(var j=1; j <= 6;  j++)
				{
					elementToEdit = "#movie" + j;
					if(wishlist[i].movie_name === $(elementToEdit).text().trim() )
					{
						elementToEdit = "#favourite" + j;
						$(elementToEdit).attr('src', 'pictures/full_heart.png');
					}
				}
			}

		}
	}

}





let mvideo = document.getElementById("video-modal");
$("#film1").click(function() { 
	mvideo.style.display = "block";
  });
  
let mvideo2 = document.getElementById("video-modal2");
  $("#film2").click(function() { 
	mvideo2.style.display = "block";
  });
 
let mvideo3 = document.getElementById("video-modal3");
$("#film3").click(function() { 
	mvideo3.style.display = "block";
  });

window.onclick = function(event) {
	if (event.target == mvideo) {
		mvideo.style.display = "none";
	  }
	if (event.target == mvideo2) {
	  mvideo2.style.display = "none";
	}
	if (event.target == mvideo3) {
		mvideo3.style.display = "none";
		
	}

} 

