
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
		//Change Login Option to Log out
		$("#sign-in").text("Log Out").attr("href", "javascript:void(0);").attr("id","logout_button"); //javascript void prevents redirect on link press (handled in function instead ) 

		//Change Register Option to My profile
		$("#register").text("My Profile").attr("id","my_profile").attr("href", "my-profile");
		
		//Set Profile Picture if logged in
		setProfilePhoto();
	}
	else  //if user is not logged in
	{
		//Reverse changes to options above  if needed
		if( $("#logout_button").text() === "" || $("#logout_button").text() === null)  //revert to guest view
		{
			//Change Log out to Login
			$("#logout-button").text("Sign In").attr("id", "sign-in").attr("href", "login");

			//Change My Profile Option to Register
			$("#my-profile").text("Register").attr("id", "register").attr("href", "register");
					
			//Set Profile Picture to default
			setProfilePhoto();
		}

	}
}


function logout()
{
	if(sessionStorage.getItem('user-email') === null)  //if not logged in - impossible case unless jquery function fails to changed from logged in to guest
	{
		//Give feedback operation not allowed
		alert("You must be signed in to logout");
	}
	else
	{
		sessionStorage.clear();
		window.location.href = "/";  //redirect to home / refresh page
	}  
}



$("#favourite1").click(function() { 
  if($('#favourite1').attr('src') === 'pictures/empty_heart.png') {
	$('#favourite1').attr('src', 'pictures/full_heart.png');
  }
  else {
	$('#favourite1').attr('src', 'pictures/empty_heart.png');
  }
});

$("#favourite2").click(function() { 
  if($('#favourite2').attr('src') === 'pictures/empty_heart.png') {
	$('#favourite2').attr('src', 'pictures/full_heart.png');
  }
  else {
	$('#favourite2').attr('src', 'pictures/empty_heart.png');
  }
});

$("#favourite3").click(function() { 
  if($('#favourite3').attr('src') === 'pictures/empty_heart.png') {
	$('#favourite3').attr('src', 'pictures/full_heart.png');
  }
  else {
	$('#favourite3').attr('src', 'pictures/empty_heart.png');
  }
});

$("#favourite4").click(function() { 
  if($('#favourite4').attr('src') === 'pictures/empty_heart.png') {
	$('#favourite4').attr('src', 'pictures/full_heart.png');
  }
  else {
	$('#favourite4').attr('src', 'pictures/empty_heart.png');
  }
});

$("#favourite5").click(function() {   
  if($('#favourite5').attr('src') === 'pictures/empty_heart.png') {
	$('#favourite5').attr('src', 'pictures/full_heart.png');
  }
  else {
	$('#favourite5').attr('src', 'pictures/empty_heart.png');
  }
});

$("#favourite6").click(function() { 
  if($('#favourite6').attr('src') === 'pictures/empty_heart.png') 
  {
	$('#favourite6').attr('src', 'pictures/full_heart.png');
  }
  else 
  {
	$('#favourite6').attr('src', 'pictures/empty_heart.png');
  }
});


let mvideo = document.getElementById("video-modal")
$("#film1").click(function() { 
	modal.style.display = "block";
  });
  