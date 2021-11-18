$(document).ready(function() {
    $('#register-form').validate({
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
            customer_contactphone:  {
                required: true,
                minlength: 6,
                maxlength: 14            
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
            customer_contactphone:  {
                required: 'Please enter your phone number',
                minlength: 'Your phone number should contain at least 6 chars.',
                maxlength: 'Your phone number should only contain max 14 characters'
            }                
    
        },
        onfocusout: validateFiels,
        submitHandler: createAjaxPost
    });
    

    function validateFiels(element, event) {
        $(element).valid();
    }
    
    function createAjaxPost() {
        const data = {
            customerName: $("#customer_name")[0].value,
            customerEmail: $("#customer_email")[0].value,
            customerPassword: $("#customer_password")[0].value,
            customerPhone: $("#customer_contactphone")[0].value
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
        sessionStorage.setItem("user-phone", response.customerPhone);
        window.location.href = "/login";
    }

});


