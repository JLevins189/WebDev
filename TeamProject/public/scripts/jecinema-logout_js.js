$(document).ready(function()
{
    $("#logoutBttn").click(function() 
    {
        logout();
    });

    $("#logoutBttn2").click(function() 
    {
        logout();
    });
});



function logout()
{
    sessionStorage.clear();
    window.location.href = '/logout';
}
