$(document).ready(function() {
	setProfilePhoto();
	setMovieNames();
	getBookedMoviesFromDatabase();


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

function clickCancel()
{
	if(confirm("Do you want to cancel your booking?")) {
		//drop booking here
	}
	else {
		//just exit.
	}
};


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


//Populate all values with values from the DB for logged in user
function getBookedMoviesFromDatabase() 
{
	const userEmail = sessionStorage.getItem("user-email");

	if(userEmail !== undefined || userEmail !== null)
	{
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "/getBookedMovies/"  + userEmail); //+ sessionStorage.getItem("user-email"));
		xhttp.send();
		xhttp.onload = function() 
		{  	//when response received
			/*change wishlist pictures to db values, using session variables to carry across pages*/
            if(xhttp.status !== 204)
            {
			    const response = JSON.parse(xhttp.response);  //response as JSON obj
				// console.log(response.bookedMovies);
			    const bookedMovies = response.bookedMovies;
				setCurrentMovie(bookedMovies);
            }
  
        }
    }
}


function setCurrentMovie(bookedMovies)
{
	//Add a dropped down of movies that user has booked to be changed to another
	for(i=0; i<bookedMovies.length; i++)
	{
		$('<option/>', { value : bookedMovies[i].movie_name}).text(bookedMovies[i].movie_name).appendTo('#bookedMoviesSelect');
	}
	
}