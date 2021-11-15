$(document).ready(function() {
    $('#register-form').validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            customer_name: {
                required: true,
                minlength: 4,
                maxlength: 50
            },
            customer_email: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50
            },
            customer_confemail: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#customer_email"
            },
            customer_password:  {
                required: true,
                minlength: 5,
                maxlength: 50            
            },
            customer_confpassword:  {
                required: true,
                minlength: 5,
                maxlength: 50 ,
                equalTo: "#customer_password"           
            },
            customer_contactphone:  {
                required: true,
                minlength: 6,
                maxlength: 14            
            },
        },
        messages: {
            customer_name: {
                required: 'Please enter your name',
                minlength: 'Your name should contain at least 4 chars.'
            },
            customer_email: {
                required: 'Please enter your email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid'
            },
            customer_confemail: {
                required: 'Please re-enter your email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid',
                equalTo: 'Confirm Email must match Email.'
            },
            customer_password:  {
                required: 'Please enter a password',
                minlength: 'Your password should contain at least 5 chars.'
            },
            customer_confpassword:  {
                required: 'Please enter a password',
                minlength: 'Your password should contain at least 5 chars.',
                equalTo: 'Confirm Password should match Password.'
            },
            customer_contactphone:  {
                required: 'Please enter your phone number',
                minlength: 'Your phone number should contain at least 6 chars.',
                maxlength: 'Your phone number should only contain max 14 characters'
            }                
    
        },
        onfocusout: validateFiels,
        submitHandler: createAjaxPost
    });
    

    function validateFiels(element, event) {
        $(element).valid();
    }
    
    function createAjaxPost() {
        const data = {
            customerName: $("#customer_name")[0].value,
            customerEmail: $("#customer_email")[0].value,
            customerPassword: $("#customer_password")[0].value,
            customerPhone: $("#customer_contactphone")[0].value
        }

        const post = $.post('http://localhost:3000/newuser', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#RegisterBttn').click(function() {
        $('#register-form').submit();
        $("#RegisterBttn").prop("disabled", true);
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
        $("#RegisterBttn").prop("disabled", false);  //re-enable button after post
        if ( xhr.status == 400  &&  $("#errortext").length == 0 )   //incorrect login
        {
            $("<p id='errortext' style='color:red;''>User already exists</p>").insertAfter("#registerheader");
        }
        else if (xhr.status !== 400)
        {
            console.log("Validation Errors");
        } 
    }
    

        
    

    function processResults(response, status, xhr) {    //set session variables and redirect to login immediately
        sessionStorage.setItem("user-name", response.customerName);
        sessionStorage.setItem("user-email", response.customerEmail);
        sessionStorage.setItem("user-phone", response.customerPhone);
        window.location.href = "/login";
    }

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
