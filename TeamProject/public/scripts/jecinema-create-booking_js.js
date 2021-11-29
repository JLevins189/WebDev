$(document).ready(function() {
	setMovieNames();
	checkLogin();
	autofillForm();
	setProfilePhoto();
	
	$("#movielist").change(function(){
		let movieSelected = $( "#movielist" ).val();  //Catch Option Selected on drop-down and save it to session variable for next step
		sessionStorage.setItem("movie-selected", movieSelected);
		let customerEmail = $( "#booking_email" ).val();
		sessionStorage.setItem("user-email", customerEmail);  //Catch email entered and save it to session variable for next step
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


    function processResults(response, status, xhr) 
	{    //send get request to book a seat
		sessionStorage.setItem("user-email", response.customerEmail);
		sessionStorage.setItem("movie-selected", response.movieName);
		window.location.href = "/select-seat";
    }


	$('#searchIn').keypress(function (e) {
        if(e.which == 13)
        {
            $('#search').click();
            return false; 
        }
    });  
	// searches for matching strings when the search button is clicked
	$('#search').click(function() { 
    let searchInput = $('#searchIn').val();
    let movieArray = [];
	//pushes movies to the array
    movieArray.push('savingprivateryan');
    movieArray.push('thegodfather');
    movieArray.push('pawpatrol');
    movieArray.push('thelionking');
    movieArray.push('notimetodie');
    movieArray.push('deadlycuts');
	//cleans the search entry and ensures it is lowercase and without special characters
    let searchInputCleaned = searchInput.replace(/[^A-Z0-9]/ig, '').toLowerCase();

	//opens up a new page with the film information
    if(jQuery.inArray(searchInputCleaned, movieArray) !== -1) {
        window.open("http://localhost:3000/" + searchInputCleaned, '_self');
    } else {
        window.open("http://localhost:3000/no-results",'_self');
    }

});



});



function autofillForm()
{
	let movieSelected = sessionStorage.getItem('movie-selected');
	let userEmail = sessionStorage.getItem('user-email');


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




