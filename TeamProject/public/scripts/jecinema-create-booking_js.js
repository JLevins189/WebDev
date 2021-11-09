$(document).ready(function() 
{
    $(function () 
	{	
		//Fill Out Rows Using Session Data
		setMovieNames();
		autofillForm();
		//Catch form data and save for later
		$("#movielist").change(function(){
			let movieSelected = $( "#movielist" ).val();  //Catch Option Selected on drop-down and save it to session variable for next step
			sessionStorage.setItem("movie-selected", movieSelected);
			console.log(movieSelected);
			let customerEmail = $( "#booking_email" ).val();
			sessionStorage.setItem("user-email", customerEmail);  //Catch email entered and save it to session variable for next step
			let customerPhone = $( "#cust_contactphone" ).val();
			sessionStorage.setItem("user-phone", customerPhone);  //Catch phone and save it to session variable for next step
		})
		/*
		Make sure form is filled out correctly before this step
		
		*/
		$("#NextStepBttn").click(function() //when user wants to go to next step
		{
			window.location.href = "select-seat";  //bring to pick a seat before posting form
			
		});
	});
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
		console.log("HHHHH");
		console.log(movieSelected);
		$('option:contains(' + movieSelected + ')').attr('selected', true);

	}
	if(sessionStorage.getItem('user-email') !== null)
	{
		//Fill into form
		$("#booking_email").val(userEmail);
		console.log(userEmail);  //testing
	}
	if(sessionStorage.getItem('user-phone') !== null)
	{
		//Fill into form
		$("#cust_contactphone").val(userPhone);
		console.log(userPhone);  //testing
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
