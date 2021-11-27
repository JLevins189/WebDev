$(document).ready(function() {
	setMovieNames();
	checkLogin();
	autofillForm();
	
	$("#movielist").change(function(){
		let movieSelected = $( "#movielist" ).val();  //Catch Option Selected on drop-down and save it to session variable for next step
		sessionStorage.setItem("movie-selected", movieSelected);
		let customerEmail = $( "#booking_email" ).val();
		sessionStorage.setItem("user-email", customerEmail);  //Catch email entered and save it to session variable for next step
		let customerPhone = $( "#cust_contactphone" ).val();
		sessionStorage.setItem("user-phone", customerPhone);  //Catch phone and save it to session variable for next step
	})
	$('#createBookingForm').validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            movieName:  {
				required: true,
				minlength: 5,
				maxlength: 50
			},
			loginEmail: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50,
				equalTo: "sessionStorage.getItem(user-email)"
            },
			contactPhone:  {
                required: true,
                minlength: 6,
                maxlength: 14            
            },


        },
        messages: {
            movieName:  {
				required: 'Please choose a movie',
				minlength: 'Movie name invalid',
				maxlength: 'Movie name invalid',
			},
			loginEmail: {
                required: 'Please enter your email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid',
				equalTo: 'Email address does not match your own'
            },
            contactPhone:  {
                required: 'Please enter your phone number',
                minlength: 'Your phone number should contain at least 6 chars.',
                maxlength: 'Your phone number should only contain max 14 characters'
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
            movieName: $("#movielist").val(),
			loginEmail: $("#loginEmail")[0].value,
			customerPhone: $("#contactPhone")[0].value
        }
        const post = $.post('http://localhost:3000/newbooking', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#NextStepBttn').click(function() {
        $('#createBookingForm').submit();
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
		if ( xhr.status == 401  &&  $("#errortext").length == 0 )   //incorrect login
        {
            $("<p id='errortext' style='color:red;''>Please enter your own email address</p>").insertAfter("#loginheader");
        }
		else
		{
			console.log('Validation errors');
		}
		
    }


    function processResults(response, status, xhr) {    //send get request to book a seat
		sessionStorage.setItem("user-email", response.customerEmail);
        sessionStorage.setItem("user-phone", response.customerPhone);
		sessionStorage.setItem("movie-selected", response.movieName);
		window.location.href = "/select-seat";
    }

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



function autofillForm()
{
	let movieSelected = sessionStorage.getItem('movie-selected');
	let userEmail = sessionStorage.getItem('user-email');
	let userPhone = sessionStorage.getItem("user-phone");


	if(sessionStorage.getItem('movie-selected') !== null)
	{
		//Fill movie into form
		$('option:contains(' + sessionStorage.getItem('movie-selected') + ')').attr('selected', true);
	}
	if(sessionStorage.getItem('user-email') !== null)
	{
		//Fill into form
		$("#loginEmail").val(userEmail);
	}
	if(sessionStorage.getItem('user-phone') !== null)
	{
		//Fill into form
		$("#contactPhone").val(userPhone);
	}
	if(sessionStorage.getItem('user-phone') !== null)
	{
		$("contactPhone").val(userPhone);
	}			
	
}


function setMovieNames()  //To Make the movie names dynamic for future updates
{
	let movie1Name = "Saving Private Ryan";
	let movie2Name = "The Godfather";
	let movie3Name = "Paw Patrol";
	let movie4Name = "The Lion King";
	let movie5Name = "007: No Time to Die";
	let movie6Name = "Deadly Cuts";
	
	
	$("#movie1").text(movie1Name);
	$("#movie2").text(movie2Name);
	$("#movie3").text(movie3Name);
	$("#movie4").text(movie4Name);
	$("#movie5").text(movie5Name);
	$("#movie6").text(movie6Name);
	
	$("#movie1").val(movie1Name);
	$("#movie2").val(movie2Name);
	$("#movie3").val(movie3Name);
	$("#movie4").val(movie4Name);
	$("#movie5").val(movie5Name);
	$("#movie6").val(movie6Name);
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

