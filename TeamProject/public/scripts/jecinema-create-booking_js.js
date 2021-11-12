const { request } = require("express");

$(document).ready(function() {
	setMovieNames();
	autofillForm();
	$("#movielist").change(function(){
		let movieSelected = $( "#movielist" ).val();  //Catch Option Selected on drop-down and save it to session variable for next step
		sessionStorage.setItem("movie-selected", movieSelected);
		console.log(movieSelected);
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
                maxlength: 50
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
                email: 'Email address format not valid'
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
    

    $('#loginbttn').click(function() {
        $('#createBookingForm').submit();
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
        console.log('Validation errors');
    }


    function processResults(response, status, xhr) {    //send get request to book a seat
        sessionStorage.setItem("user-email", response.customerEmail);
        sessionStorage.setItem("user-phone", response.customerPhone);
		sessionStorage.setItem("movie-selected", response.MovieName);
		window.location.href = "/select-seat";
    }

});



function autofillForm()
{
	let movieSelected = sessionStorage.getItem('movie-selected');
	let userEmail = sessionStorage.getItem('user-email');
	let userPhone = sessionStorage.getItem("user-phone");
	
	/* Test
	userEmail = "jecinema@hotmail.com";
	userPhone = "0861112222";
	sessionStorage.setItem("user-email", userEmail);
	sessionStorage.setItem("user-phone", userPhone);
	*/

	if(sessionStorage.getItem('movie-selected') !== null)
	{
		//Fill movie into form
		$('option:contains(' + movieSelected + ')').attr('selected', true);
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
