$(document).ready(function() {
	setProfilePhoto();
});


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

function clickCancel()
{
	if(confirm("Do you want to cancel your booking?")) {
		//drop booking here
	}
	else {
		//just exit.
	}
};


