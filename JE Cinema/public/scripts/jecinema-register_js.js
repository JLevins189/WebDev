$(document).ready(function() {
    $('#register-form').validate({  //Validate input
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            customer_name: {
                required: true,
                minlength: 4,
                maxlength: 50
            },
            customer_email: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50
            },
            customer_confemail: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50,
                equalTo: "#customer_email"
            },
            customer_password:  {
                required: true,
                minlength: 5,
                maxlength: 50            
            },
            customer_confpassword:  {
                required: true,
                minlength: 5,
                maxlength: 50 ,
                equalTo: "#customer_password"           
            },
            security_question1:  {
                required: true,
                minlength: 5,
                maxlength: 50 ,           
            },
            security_question2:  {
                required: true,
                minlength: 5,
                maxlength: 50 ,           
            },
            
        },
        messages: {
            customer_name: {
                required: 'Please enter your name',
                minlength: 'Your name should contain at least 4 chars.'
            },
            customer_email: {
                required: 'Please enter your email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid'
            },
            customer_confemail: {
                required: 'Please re-enter your email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid',
                equalTo: 'Confirm Email must match Email.'
            },
            customer_password:  {
                required: 'Please enter a password',
                minlength: 'Your password should contain at least 5 chars.'
            },
            customer_confpassword:  {
                required: 'Please enter a password',
                minlength: 'Your password should contain at least 5 chars.',
                equalTo: 'Confirm Password should match Password.'
            },
            security_answer1:  {
                required: 'Please enter an answer',
                minlength: 'Your answer should contain at least 5 chars.'
            },
            security_answer2:  {
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
    
    //Submit Form
    function createAjaxPost() {
        const data = {
            customerName: $("#customer_name")[0].value,
            customerEmail: $("#customer_email")[0].value,
            customerPassword: $("#customer_password")[0].value,
            securityAnswer1: $("#security_question1")[0].value,
            securityAnswer2: $("#security_question2")[0].value
        }

        const post = $.post('http://localhost:3000/newuser', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#RegisterBttn').click(function() {
        $('#register-form').submit();
        $("#RegisterBttn").prop("disabled", true);
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
        $("#RegisterBttn").prop("disabled", false);  //re-enable button after post
        if ( xhr.status == 400  &&  $("#errortext").length == 0 )   //incorrect login
        {
            $("<p id='errortext' style='color:red;''>User already exists</p>").insertAfter("#registerheader");
        }
        else if (xhr.status !== 400)
        {
            console.log("Validation Errors");
        } 
    }
    
    function processResults(response, status, xhr) {    //set session variables and redirect to login immediately
        $("#RegisterBttn").prop("disabled", false);  //re-enable button after post
        sessionStorage.setItem("user-name", response.customerName);
        sessionStorage.setItem("user-email", response.customerEmail);
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


