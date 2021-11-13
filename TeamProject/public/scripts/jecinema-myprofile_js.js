$(document).ready(function() {
    getDatabase();
    $("#logout_button").click(function()
    {
        logout();
    });
    //Store Database values to session
    const userEmail = sessionStorage.getItem("user-email");
    let profilepic = sessionStorage.getItem("user-picture");
    const userFullName = sessionStorage.getItem("user-name");
    autofillForm(userEmail, userFullName);

    //Form Post and Validation
    $('#changeDetails').validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            fullname: {
                required: true,
                minlength: 4,
                maxlength: 50
            },
            fullemail: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50
            },
            fullpassword:  {
                required: true,
                minlength: 5,
                maxlength: 50            
            },
            oldEmail: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50
            },
        },
        messages: {
            fullname: {
                required: 'Please enter a new name',
                minlength: 'Your name should contain at least 4 chars.'
            },
            fullemail: {
                required: 'Please enter your new email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid'
            },
            fullpassword:  {
                required: 'Please enter a new password',
                minlength: 'Your password should contain at least 5 chars.'
            },               
        },
        onfocusout: validateFiels,
        submitHandler: createAjaxPost
    });
    

    function validateFiels(element, event) {
        $(element).valid();
    }
    
    function createAjaxPost() {
        const data = {
            customerName: $("#name")[0].value,
            customerEmail: $("#email")[0].value,
            customerPassword: $("#password")[0].value,
            oldEmail: $("#userEmail2")[0].value
        }

        const post = $.post('http://localhost:3000/changeuser', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#SaveBttn').click(function() {
        $('#changeDetails').submit();
        $("#SaveBttn").prop("disabled", true);  //prevent double posts
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
        console.log('Validation errors');
        $("#SaveBttn").prop("disabled", false);  //re-enable for re-use 
    }

        
    

    function processResults(response, status, xhr) {    //set session variables and redirect to login immediately
        $("#SaveBttn").prop("disabled", false);  //re-enable for re-use 
        sessionStorage.setItem("user-name", response.customerName);
        sessionStorage.setItem("user-email", response.customerEmail);
        window.location.reload;
    }

});



let editedFullName = $("#name").val();
let editedEmail = $("#email").val();

//Populate all values with values from the DB for logged in user
function getDatabase() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getuser/" + sessionStorage.getItem("user-email"));
    xhttp.send();
    xhttp.onload = function() {  //when response received
    /*change elements to db values, using session variables to carry across pages such as profile picture*/
        const response = JSON.parse(xhttp.response);  //response as JSON obj

        //Set session variables - Elements will be set to these values using functions
        if(response.customerProfilePic !== null)
        {
            sessionStorage.setItem("user-picture", "pictures/profilepictures/" + response.customerProfilePic);
        }
        sessionStorage.setItem("user-name", response.customerName);
        sessionStorage.setItem("user-email", response.customerEmail);

        //Password only needed for this page and may be dangerous to store in session
        $("#password").val(response.customerPassword);
        setProfilePhoto();  //Set profile picture from db
    }

}


//Take Uploaded Image and set it to profile pic
function uploadFile(){
    var image = $("input[type=file]").get(0).files[0];

    if(image){
        var reader = new FileReader();

        reader.onload = function(){
            //Set Picture to user's profile picture 
            sessionStorage.setItem("user-picture", reader.result);
            setProfilePhoto();
            //Post image to db
        }

        reader.readAsDataURL(image);
    }
}


function setProfilePhoto()
{ 
    if(sessionStorage.getItem("user-picture") !== null)
    {
        profilepic = sessionStorage.getItem("user-picture");
        $("#profile-pic").attr("src", profilepic);
        $("#user-picture").attr("src", profilepic);
    }
    else
    {
        $("#user-picture").attr("src", "pictures/profilepic.jpg");  //Revert to default image if none in db
    }

}  


function autofillForm(userEmail, userFullName)
{
    if(userEmail !== null)  //set email field
    {
        $("#email").val(userEmail);
        $("#userEmail").val(userEmail);  //hidden field to make sure right account's profile image is changed
        $("#userEmail2").val(userEmail);  //hidden field to make sure right account's details are changed
    }
    if(userFullName !== null)  //set name field
    {   
        $("#name").val(userFullName);
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