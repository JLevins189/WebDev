$(document).ready(function() 
{
    checkLogin();


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



