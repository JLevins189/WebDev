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
	

}	
