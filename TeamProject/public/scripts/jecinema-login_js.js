$(document).ready(function() {
    $("#logout_button").click(function()
    {
        logout();
    });
    $('#login-form').validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            loginemail: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50
            },
            loginpassword:  {
                required: true,
                minlength: 5,
                maxlength: 50            
            },

        },
        messages: {
            loginemail: {
                required: 'Please enter your email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid'
            },
            loginpassword:  {
                required: 'Please enter a password',
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
            customerEmail: $("#loginemail")[0].value,
            customerPassword: $("#loginpassword")[0].value
        }
        const post = $.post('http://localhost:3000/existinguser', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#loginbttn').click(function() {
        $('#login-form').submit();
        $("#loginbttn").prop("disabled", true);  //prevent double posts
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
        $("#loginbttn").prop("disabled", false);  //re-enable button after post
        if ( xhr.status == 400  &&  $("#errortext").length == 0 )   //incorrect login
        {
            $("<p id='errortext' style='color:red;''>You have entered an invalid email or password</p>").insertAfter("#loginheader");
        }
        else if (xhr.status !== 400)
        {
            console.log("Validation Errors");
        } 
    }

        
    

    function processResults(response, status, xhr) {    //set session variables and redirect to my profile immediately if successful
        $("#loginbttn").prop("disabled", false);  //re-enable button after post
        sessionStorage.setItem("user-email", response.customerEmail);
        sessionStorage.setItem("user-name", response.customerName);
        sessionStorage.setItem("user-phone", response.customerPhone);
        window.location.href = "/my-profile";
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

});


function autofillForm()
{
	let userEmail = sessionStorage.getItem('user-email');
	
	if(sessionStorage.getItem('user-email') !== null)
	{
		//Fill into form
		$("#loginemail").val(userEmail);
	}
}
