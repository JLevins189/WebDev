$(document).ready(function() 
{
    $(function () {
		$("#button-movie1").click(function() 
		{
			whatsOnMovie1();
			
		});


		$("#button-movie2").click(function ()
		{
			whatsOnMovie2();
		});


		$("#button-movie3").click(function() 
		{
			whatsOnMovie3();
		});
			});
		});




function whatsOnMovie1()
{
	let movie1 = $("#movie1").text();
	sessionStorage.setItem("movie-selected", movie1);
	//let data = sessionStorage.getItem('movie-selected');
	//console.log(data);
	//var movie2 = "The Godfather";
	
	window.location.href = "create-booking.html";	
	let data = sessionStorage.getItem("movie-selected");
	console.log(data);
	//Get form row (movie name) by id
	//place var movie name into it 

}	

function whatsOnMovie2()
{
	
	let movie2 = $("#movie2").text();
	sessionStorage.setItem('movie-selected', movie2);
	//let data = sessionStorage.getItem('movie-selected');
	//console.log(data);
	//var movie2 = "The Godfather";
	
	window.location.href = "create-booking.html";
	let data = sessionStorage.getItem('movie-selected');
	console.log(data);
	//Get form row (movie name) by id
	//place var movie name into it 

}	

function whatsOnMovie3()
{
	
	var movie3 = "Paw Patrol";
	window.location.href = "create-booking.html";
	//Get form row (movie name) by id
	//place var movie name into it 

}	