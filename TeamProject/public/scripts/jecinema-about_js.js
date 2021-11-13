$(document).ready(function() 
{
    $("#logout_button").click(function()
    {
        logout();
    });
    checkLogin();

});    


function setProfilePhoto()
{
    if(sessionStorage.getItem("user-picture") !== null)
    {
        //Set Picture to user's profile picture 
        const profilePicture = sessionStorage.getItem("user-picture");
        $("#user-picture").attr("src",profilePicture);
        console.log("HHH");
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

