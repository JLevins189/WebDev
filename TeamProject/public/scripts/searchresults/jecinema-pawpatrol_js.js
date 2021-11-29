$(document).ready(function() 
{
    $( "#BookingButton" ).click(function() {
        let movieTitle = $("#MovieTitle").text().trim();
        sessionStorage.setItem("movie-selected", movieTitle);
        window.location.href = 'create-booking';
    });
});