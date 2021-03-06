/*Reference note
Investigation into exitsing solutions on irish websites were inspected
using inspect element
we noticed the div class changes on selection and occupation (from seat -> seat.selected/seat.occupied)
and CSS was used with JS to affect the seats

Actually pulling this off required help from various sources
https://stackoverflow.com/questions/43109676/submit-form-with-selected-concert-seats-with-javascript-and-html
https://codepen.io/Norbert-V/pen/KdXjgK
https://diyifang.medium.com/movie-seat-booking-with-javascript-e140d6f5efd2

The difference with ours is seats are occupied based on a database booking system that checks
if the seat has been booked for that movie
Bookings go directly into the database
JQuery is used in addition to plain JS

Despite a lot of code being used from an online source, 
the feautures added or changed required a lot of thought & work
We do not take any credit for any code from these listed sources
*/



$(document).ready(function() {

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

//Set Initial View
setProfilePhoto();
const movieName = sessionStorage.getItem("movie-selected");
$('<br><h3 style="text-align:center;">' + movieName + '</h3><br>').appendTo('#movie-name');

// Initial count and total set
let ticketPrice = 10;
updateSelectedCount();
setOccupiedSeats(movieName);

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
FillInfo();  //Mark Seats selected from storage


// Update total and count
function updateSelectedCount() 
{

  const selectedSeats = $('.row .seat.selected').toArray();  //seat selected counter
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsAmnt = selectedSeats.length;

  $('#count').text(selectedSeatsAmnt);  //the amount of seats selected
  $('#total').text(selectedSeatsAmnt * ticketPrice);  // charge per seat
  
}

// Get data from localstorage and fill in info
function FillInfo() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}

// Seat click event
container.addEventListener('click', event => {
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')  )  //if seat is not occupied 
  {
    event.target.classList.toggle('selected');  //toggle it to selected classlist
    updateSelectedCount();  //update the selected info on each seat selection on each click
  }
});


// Set occupied seats from database
function setOccupiedSeats(movieName)  {
//Populate all values with values from the DB for logged in user
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/getSeats/"  + movieName); //+ sessionStorage.getItem("user-email"));
  xhttp.send();
  xhttp.onload = function() {  //when response received
  /*change elements to db values, using session variables to carry across pages such as profile picture*/
      const response = JSON.parse(xhttp.response);  //response as JSON obj
      const occupiedSeats = response.rows;

      if(occupiedSeats.length > 0)
      {
        let currentSeat;
        for(let i=0; i<occupiedSeats.length; i++)
        {
          currentSeat = occupiedSeats[i].seat_no;
          seats[currentSeat].classList.add('occupied');
        }
        
      }
  }
}








$("#BookingBttn").click(function()  
{
  //Make sure at least one seat selected
  if( $("#count").text() > 0)
  {
    //Take data from session storage to complete booking
    const data = 
    {
      movieName: sessionStorage.getItem("movie-selected"),
      loginEmail: sessionStorage.getItem("user-email"),
      seatsBooked: JSON.parse(localStorage.getItem('selectedSeats'))  //seat numbers in array
    }

    //Post
    const post = $.post('http://localhost:3000/seatselect', data);
    post.done(processResults);
    post.fail(processErrors);
  }
  else
  {
    alert("Please choose a seat to book!");
  }
});
  

 

function processErrors(xhr, textStatus, errorThrown) 
{
  console.log('An error has occured');
}


function processResults(response, status, xhr) 
{
  console.log("Success");
  window.location.href = 'booking-success';
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









