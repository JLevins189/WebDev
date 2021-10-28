$(document).ready(function() 
{
    $(function () 
	{	
		//Fill Out Rows Using Session Data
		autofillForm();
	});
});	

	

function autofillForm()
{
	let movieSelected = sessionStorage.getItem('movie-selected');
	let userEmail = sessionStorage.getItem('user-email');
	let userPhone = sessionStorage.getItem("user-phone");


	if(sessionStorage.getItem('movie-selected') === null)
	{
		//Ignore this field
		console.log("NULL");  //testing
	}
	else
	{
		//Fill into form
		console.log(movieSelected);  //testing
	}
	if(sessionStorage.getItem('user-email') === null)
	{
		//Ignore this field
		console.log("NULL");  //testing
	}
	else
	{
		//Fill into form
		console.log(user-email);  //testing
	}
	if(sessionStorage.getItem('user-email') === null)
	{
		//Ignore this field
		console.log("NULL");  //testing
	}
	else
	{
		//Fill into form
		console.log(userEmail);  //testing
	}	
	if(sessionStorage.getItem('user-phone') === null)
	{
		//Ignore this field
		console.log("NULL");  //testing
	}
	else
	{
		//Fill into form
		console.log(userPhone);  //testing
	}			
	

}	
