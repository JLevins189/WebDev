
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
		$("#logout_button").click(function()
		{
			logout();
		});
		

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
	console.log(movieWishlist);  //test
	console.log("Added to wishlist");
	let movieNumber = movieWishlist.replace('movie','');
	console.log(movieNumber);
	let elementToEdit = "#favourite" + movieNumber;
	console.log(elementToEdit);
	$(elementToEdit).attr('src', 'pictures/full_heart.png');
	alert("DONE!");  //remove after testing
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
	console.log(movieWishlist);  //remove after testing
	console.log("Added to wishlist");
	let movieNumber = movieWishlist.replace('movie','');
	console.log(movieNumber);  //remove after testing
	let elementToEdit = "#favourite" + movieNumber;
	console.log(elementToEdit);  //remove after testing
	$(elementToEdit).attr('src', 'pictures/empty_heart.png');
	alert("DONE!");  //remove after testing

}


function handleRemoveWishlistFail()
{
	alert("Error in removing from wishlist");
	console.log("Failed to remove wishlist");
}


//On Click functions for wishlist if logged in
if(sessionStorage.getItem("user-email") !== null)  //if user logged in
{
		$("#favourite1").click(function() { 
		if($('#favourite1').attr('src') === 'pictures/empty_heart.png') 
		{
			const data = {
				email: sessionStorage.getItem("user-email"),
				movie: "movie1"
			};
			console.log(data);
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
			console.log(data);
			const post = $.post("http://localhost:3000/removewishlist", data);
			post.done(handleRemoveWishlistDone(data));
			post.fail(handleRemoveWishlistFail);
			
		}
	});

	$("#favourite2").click(function() { 
	if($('#favourite2').attr('src') === 'pictures/empty_heart.png') {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie2"
		};
		console.log(data);
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie2"
		};
		console.log(data);
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
	});

	$("#favourite3").click(function() { 
	if($('#favourite3').attr('src') === 'pictures/empty_heart.png') {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie3"
		};
		console.log(data);
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie3"
		};
		console.log(data);
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
	});

	$("#favourite4").click(function() { 
	if($('#favourite4').attr('src') === 'pictures/empty_heart.png') {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie4"
		};
		console.log(data);
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie4"
		};
		console.log(data);
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
	});

	$("#favourite5").click(function() {   
	if($('#favourite5').attr('src') === 'pictures/empty_heart.png') {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie5"
		};
		console.log(data);
		const post = $.post("http://localhost:3000/addwishlist", data);
		post.done(handleAddWishlistDone(data));
		post.fail(handleAddWishlistFail);

	}
	else {
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie5"
		};
		console.log(data);
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
	});

	$("#favourite6").click(function() { 
	if($('#favourite6').attr('src') === 'pictures/empty_heart.png') 
	{
		const data = {
			email: sessionStorage.getItem("user-email"),
			movie: "movie6"
		};
		console.log(data);
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
		console.log(data);
		const post = $.post("http://localhost:3000/removewishlist", data);
		post.done(handleRemoveWishlistDone(data));
		post.fail(handleRemoveWishlistFail);
	}
	});

}
else  // if not logged in
{
	alert("You must be logged in to add to wishlist!");
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
	if (event.target == mvideo2) {
	  mvideo2.style.display = "none";
	}
	if (event.target == mvideo) {
		mvideo.style.display = "none";
	  }
	if (event.target == mvideo3) {
		mvideo3.style.display = "none";
	}

} 
