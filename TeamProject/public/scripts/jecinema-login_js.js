$(document).ready(function() {
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
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
        console.log(xhr.status);
        if ( xhr.status == 401  &&  $("#errortext").length == 0 )   //incorrect login
        {
            $("<p id='errortext' style='color:red;''>You have entered an invalid email or password</p>").insertAfter("#loginheader");
        }
        else if (xhr.status !== 401)
        {
            console.log("Validation Errors");
        } 
    }

    function processResults(response, status, xhr) {    //set session variables and redirect to my profile immediately if successful
        console.log("Success");
        $("#loginbttn").prop("disabled", false);  //re-enable button after post
        sessionStorage.setItem("user-email", response.customerEmail);
        sessionStorage.setItem("user-name", response.customerName);
        window.location.href = "/my-profile";
    }

    autofillForm();

    $('#searchIn').keypress(function (e) {
        if(e.which == 13)
        {
            $('#search').click();
            return false; 
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
            window.open("http://localhost:3000/no-results",'_self');
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


function autofillForm()
{
	let userEmail = sessionStorage.getItem('user-email');
	
	if(sessionStorage.getItem('user-email') !== null)
	{
		//Fill into form
		$("#loginemail").val(userEmail);
	}
}
