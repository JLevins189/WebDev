const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = $('#count');
const total = $('#total');

$("#logout_button").click(function()
{
  logout();
});

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
		//Change Login Option to Log out
		$("#sign-in").text("Log Out").attr("href", "javascript:void(0);").attr("id","logout_button"); //javascript void prevents redirect on link press (handled in function instead ) 

		//Change Register Option to My profile
		$("#register").text("My Profile").attr("id","my_profile").attr("href", "my-profile");
		
		//Set Profile Picture if logged in
		setProfilePhoto();
	}
	else  //if user is not logged in
	{
		//Reverse changes to options above  if needed
		if( $("#logout_button").text() === "" || $("#logout_button").text() === null)  //revert to guest view
		{
			//Change Log out to Login
			$("#logout-button").text("Sign In").attr("id", "sign-in").attr("href", "login");

			//Change My Profile Option to Register
			$("#my-profile").text("Register").attr("id", "register").attr("href", "register");
					
			//Set Profile Picture to default
			setProfilePhoto();
		}

	}
}


function logout()
{
	if(sessionStorage.getItem('user-email') === null)  //if not logged in - impossible case unless jquery function fails to changed from logged in to guest
	{
		//Give feedback operation not allowed
		alert("You must be signed in to logout");
	}
	else
	{
		sessionStorage.clear();
		window.location.href = "/";  //redirect to home / refresh page
	}  
}



