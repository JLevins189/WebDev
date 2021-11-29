$( "#logoutBttn" ).click(function() {
    logout();
});


function logout()
{
    sessionStorage.clear();
    window.location.href = 'logout';
}
