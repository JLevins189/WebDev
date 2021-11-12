$(document).ready(function() {
    $('#login-form').validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            loginemail: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50
            },
            loginpassword:  {
                required: true,
                minlength: 5,
                maxlength: 50            
            },

        },
        messages: {
            loginemail: {
                required: 'Please enter your email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid'
            },
            loginpassword:  {
                required: 'Please enter a password',
                minlength: 'Your password should contain at least 5 chars.'
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
            customerEmail: $("#loginemail")[0].value,
            customerPassword: $("#loginpassword")[0].value
        }
        const post = $.post('http://localhost:3000/existinguser', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#loginbttn').click(function() {
        $('#login-form').submit();
    });
    

    function processErrors(xhr, textStatus, errorThrown) {
        console.log('Validation errors');
    }

        
    

    function processResults(response, status, xhr) {    //set session variables and redirect to my profile immediately if successful
        sessionStorage.setItem("user-email", response.customerEmail);
        sessionStorage.setItem("user-name", response.customerName)
        window.location.href = "/my-profile";
    }

});

