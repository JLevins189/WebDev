$(document).ready(function() {  //Validate Form Input
    $('#password-form').validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            email: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50
            },
            loginquestion1:  {
                required: true,
                minlength: 5,
                maxlength: 50 ,           
            },
            loginquestion2:  {
                required: true,
                minlength: 5,
                maxlength: 50 ,           
            },

        },
        messages: {
            email: {
                required: 'Please enter your email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid'
            },
            loginquestion1:  {
                required: 'Please enter an answer',
                minlength: 'Your answer should contain at least 5 chars.'
            },
            loginquestion2:  {
                required: 'Please enter an answer',
                minlength: 'Your answer should contain at least 5 chars.'
            },    
        },
        onfocusout: validateFiels,
        submitHandler: createAjaxPost
    });
    

    function validateFiels(element, event) {
        $(element).valid();
    }
    
    //Submit data
    function createAjaxPost() {
        const data = {
            customerEmail: $("#email")[0].value,
            securityAnswer1: $("#loginquestion1")[0].value,
            securityAnswer2: $("#loginquestion2")[0].value
        }
        const post = $.post('http://localhost:3000/securityquestions', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#ForgotBttn').click(function() {
        $('#password-form').submit();
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
        console.log(xhr.status);
        if ( xhr.status == 401  &&  $("#errortext").length == 0 )   //incorrect login
        {
            $("<p id='errortext' style='color:red;''>You have entered an invalid email or your answers are incorrect</p>").insertAfter("#errorspace");
        }
        else if (xhr.status !== 401)
        {
            console.log("Validation Errors");
        } 
    }

    function processResults(response, status, xhr) {    //set session variables and redirect to my profile immediately if successful
        sessionStorage.setItem("user-email", response.customerEmail);  //to change the password for this email in the next page
        $("#ForgotBttn").prop("disabled", false);  //re-enable button after post
        window.location.href = "/changepassword";
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





