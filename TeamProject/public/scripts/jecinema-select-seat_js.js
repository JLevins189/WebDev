const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = $('#count');
const total = $('#total');


FillInfo();

let ticketPrice = 10;

// Update total and count
function updateSelectedCount() {
  //const  = document.querySelectorAll('.row .seat.selected');

  const selectedSeats = $('.row .seat.selected').toArray();

  //console.log(selectedSeats);

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
    !event.target.classList.contains('occupied')  //if seat is not occupied
  ) {
    event.target.classList.toggle('selected');  //toggle it to selected classlist

    updateSelectedCount();  //update the selected info on each seat selection
  }
});


//Set occupied seats from database
function setOccupiedSeats()  {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  
  selectedSeats.forEach(function (item, index) {
    console.log(item);  //Item is the seat number selected
                        //post seat numbers to be inserted to db

});
}

// Initial count and total set
updateSelectedCount();
setOccupiedSeats();


$("#BookingBttn").click(function()  {
  //post data
  //Take data from session storage to complete booking
  const data = {
    movieName: sessionStorage.getItem("movie-selected"),
    loginEmail: sessionStorage.getItem("user-email"),
    customerPhone: sessionStorage.getItem("user-phone"),
    seatsBooked: JSON.parse(localStorage.getItem('selectedSeats'))
  }
  //Add seat number

  //Post
  const post = $.post('http://localhost:3000/seatselect', data);
  post.done(processResults);
  post.fail(processErrors);
});

function processErrors(xhr, textStatus, errorThrown) {
  console.log('An error has occured');
}


function processResults(response, status, xhr) {    //set session variables and redirect to my profile immediately if successful
  console.log("Success");
}




