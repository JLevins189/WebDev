$(document).ready(function() {
    //Set hidden password variable from session
    $('#email').val(sessionStorage.getItem("user-email"));
    $('#changepassword-form').validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            password:  {
                required: true,
                minlength: 5,
                maxlength: 50 ,           
            },
            confirmpassword:  {
                required: true,
                minlength: 5,
                maxlength: 50 ,
                equalTo: "#password"           
            },  
        },
        messages: {
            password:  {
                required: 'Please enter a password',
                minlength: 'Your password should contain at least 5 chars.'
            },
            confirmpassword:  {
                required: 'Please enter a password',
                minlength: 'Your password should contain at least 5 chars.',
                equalTo: 'Confirm Password should match Password.'  
            },
        },
        onfocusout: validateFiels,
        submitHandler: createAjaxPost
    });
    

    function validateFiels(element, event) {
        $(element).valid();
    }
    
    function createAjaxPost() {
        const data = {
            customerEmail: $("#email")[0].value,
            newPassword: $("#password")[0].value
        }
        const post = $.post('http://localhost:3000/changepassword', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#changebttn').click(function() 
    {
        $('#password-form').submit();
    });
    

    function processErrors(xhr, textStatus, errorThrown) 
    {
        alert("An error occured changing your password.");
    }

    function processResults(response, status, xhr) {    //set session variables and redirect to my profile immediately if successful
        $("#changebttn").prop("disabled", false);  //re-enable button after post
        window.location.href = "/login";
    }

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





