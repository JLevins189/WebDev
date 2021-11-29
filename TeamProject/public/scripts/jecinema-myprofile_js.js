$(document).ready(function() {

    const userEmail = sessionStorage.getItem("user-email");
    let profilepic = sessionStorage.getItem("user-picture");
    const userFullName = sessionStorage.getItem("user-name");
    getDatabase(userEmail);
    getWishlistFromDatabase();
    setProfilePhoto();
    autofillForm(userEmail, userFullName);


    
    $("#addwishlist").click(function() 
    {
        window.location.href = "/"; //redirect to homepage to add movies to wishlist
    });

    $( "#DeactivateForm" ).submit(function( event ) 
    {
        event.preventDefault();
        let answer = prompt("Enter 'delete' to deactivate this account");
        if(answer !== "delete") {
            alert("You did not enter delete. This account will not be deleted");
            return false; // cancel submit
        }    
        else 
        {
            $("#DeactivateBttn").attr("disabled", true);
            createAjaxPostDeactivate();
            // sessionStorage.clear();
        }
    });

    //Deactivate Account Form 
    function createAjaxPostDeactivate() 
    {
        const data = {
            deactivateEmail: $("#deactivateEmail").val()
        }

        const deactivatepost = $.post('http://localhost:3000/deactivate-account', data);
        deactivatepost.done(processDeactivateSuccess);
        deactivatepost.fail(processDeactivateError);
        deactivatepost.always(processDeactivateSuccess);
    }

    function processDeactivateSuccess(response, status, xhr) 
    {
        sessionStorage.clear();
        window.location.href = "/logout";
    }

    function processDeactivateError(xhr, textStatus, errorThrown) 
    {
        alert("An Error occured deactivating your profile. Please try again later");
    }


    //Form Post and Validation
    $('#changeDetails').validate({
        errorElement: "div",
        errorPlacement: function(error, element) {
            element.after(error);
        },
        rules: {
            fullname: {
                required: true,
                minlength: 4,
                maxlength: 50
            },
            fullemail: {
                required: true,
                email: true,
                minlength: 5,
                maxlength: 50
            },
            fullpassword:  {
                required: true,
                minlength: 5,
                maxlength: 50            
            },
        },
        messages: {
            fullname: {
                required: 'Please enter a new name',
                minlength: 'Your name should contain at least 4 chars.'
            },
            fullemail: {
                required: 'Please enter your new email',
                minlength: 'Your email should contain at least 5 chars.',
                email: 'Email address format not valid'
            },
            fullpassword:  {
                required: 'Please enter a new password',
                minlength: 'Your password should contain at least 5 chars.'
            },               
        },
        onfocusout: validateFiels,
        submitHandler: createAjaxPost



        
    });
    

    function validateFiels(element, event) 
    {
        $(element).valid();
    }
    
    function createAjaxPost() 
    {
        const data = {
            customerName: $("#name")[0].value,
            customerEmail: $("#email").text(),
            customerPassword: $("#password")[0].value
        }

        const post = $.post('http://localhost:3000/changeuser', data);
        post.done(processResults);
        post.fail(processErrors);
    }
    

    $('#SaveBttn').click(function() 
    {
        $('#changeDetails').submit();
    });
    

    function processErrors(xhr, textStatus, errorThrown) 
    {
        console.log('Validation errors'); 
    }

        
    

    function processResults(response, status, xhr) 
    {    //set session variables and redirect to login immediately
        $("#SaveBttn").prop("disabled", false);  //re-enable for re-use 
        sessionStorage.setItem("user-name", response.customerName);
        sessionStorage.setItem("user-email", response.customerEmail);
        window.location.reload;
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
		movieArray.push('savingprivateryan');
		movieArray.push('thegodfather');
		movieArray.push('pawpatrol');
		movieArray.push('thelionking');
		movieArray.push('notimetodie');
		movieArray.push('deadlycuts');
		console.log('hello');
		console.log(scheckearchInput);
		let searchInputCleaned = searchInput.replace(/[^A-Z0-9]/ig, '').toLowerCase();
		console.log(searchInputCleaned);

		if(jQuery.inArray(searchInputCleaned, movieArray) !== -1) {
			console.log("is in array");
			window.open("http://localhost:3000/" + searchInputCleaned, '_self');
		} else {
            window.open("http://localhost:3000/no-results",'_self');
		}

	});

});



let editedFullName = $("#name").val();

//Populate all values with values from the DB for logged in user
function getDatabase(userEmail) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getuser/"  + userEmail); //+ sessionStorage.getItem("user-email"));
    xhttp.send();
    xhttp.onload = function() {  //when response received
    /*change elements to db values, using session variables to carry across pages such as profile picture*/
        const response = JSON.parse(xhttp.response);  //response as JSON obj
        //Set session variables - Elements will be set to these values using functions
        if(response.customerProfilePic !== null)
        {
            sessionStorage.setItem("user-picture", "pictures/profilepictures/" + response.customerProfilePic);
        }
        sessionStorage.setItem("user-name", response.customerName);
        sessionStorage.setItem("user-email", response.customerEmail);

        //Password only needed for this page and may be dangerous to store in session
        setProfilePhoto();  //Set profile picture from db
    }

}


//Take Uploaded Image and set it to profile pic
function uploadFile(){
    var image = $("input[type=file]").get(0).files[0];

    if(image){
        var reader = new FileReader();

        reader.onload = function(){
            //Set Picture to user's profile picture 
            sessionStorage.setItem("user-picture", reader.result);
            setProfilePhoto();
        }

        reader.readAsDataURL(image);
    }
}


function setProfilePhoto()
{ 
    if(sessionStorage.getItem("user-picture") !== null)
    {
        profilepic = sessionStorage.getItem("user-picture");
        $("#profile-pic").attr("src", profilepic);
        $("#user-picture").attr("src", profilepic);
    }
    else
    {
        $("#user-picture").attr("src", "pictures/profilepic.jpg");  //Revert to default image if none in db
    }

}  


function autofillForm(userEmail, userFullName)
{
    if(userEmail !== null)  //set email field
    {
        $("#email").text(userEmail);
        $("#userEmail").text(userEmail).val(userEmail);  //hidden field to make sure right account's profile image is changed
        $("#deactivateEmail").text(userEmail).val(userEmail);  //hidden field to make sure right account's profile is deativated
    }
    if(userFullName !== null)  //set name field
    {   
        $("#name").val(userFullName);
    }
}


function setWishlist()
{
    //hide all elements before checking match
    $("#movie1").hide();
    $("#movie2").hide();
    $("#movie3").hide();
    $("#movie4").hide();
    $("#movie5").hide();
    $("#movie6").hide();``
    if(sessionStorage.getItem("user-wishlist") !== null && sessionStorage.getItem("user-wishlist") !== undefined)  //Only if wishlist is not empty
    {
        console.log(sessionStorage.getItem("user-wishlist"));
        const wishlist = JSON.parse(sessionStorage.getItem("user-wishlist"));  //no brackets
        let stringToMatch;  //match image source of image with specifically formatted version of movie name that would match
        const matchingElements = [];
        

        var i,j;
        for (i = 0; i < wishlist.length; i++) 
        {
            //Format string of movie to match the name of its image
            stringToMatch = "pictures/"; 
            stringToMatch += wishlist[i].movie_name.split(" ").join("").toLowerCase().replace(/[^a-zA-Z0-9]/g, '')+ "_poster.jpg"; 

            //Show movies matching db
            for(j=1; j <= 6;  j++)
            {
                elementToEdit = "#movie" + j;  //the id of the current movie being checked ( #movie(number) ) 
    
                if(stringToMatch === $(elementToEdit).attr('src') )   //if movie is in wishlist
                {
                    console.log("match");
                    matchingElements.push(elementToEdit);  //all wishlist movies ids put into array
                }
                
                /*Matching elements are pushed into an array then hidden as a result of a rendering issue when they were
                hidden on the spot in the loop */

            }
        }
        //Workaround - use matching elements array and show them after everything else is hidden
        for (i = 0; i < matchingElements.length; i++)
        {
            $(matchingElements[i]).show();
        }
    }
    else
    {
        if($("#errortext").length == 0)
        {
            $("<br><p id='errortext' style='color:red; text-align:center;'>No movies found in WIshlist!<br></p>").appendTo("#errorspace");
            $("<button id='addwishlist' style='align-items: center;justify-content: center;' class='btn btn-outline-warning'>Add Movies to Wishlist</button>").appendTo("#errorspace");
        }
    }    
}


//Populate all values with values from the DB for logged in user
function getWishlistFromDatabase() 
{
	const userEmail = sessionStorage.getItem("user-email");

	if(userEmail !== undefined || userEmail !== null)
	{
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "/getwishlist/"  + userEmail); //+ sessionStorage.getItem("user-email"));
		xhttp.send();
		xhttp.onload = function() 
		{  	//when response received
			/*change wishlist pictures to db values, using session variables to carry across pages*/
            if(xhttp.status !== 204)
            {
			    const response = JSON.parse(xhttp.response);  //response as JSON obj
			    const wishlist = response.wishlist;
			
			    sessionStorage.setItem("user-wishlist", JSON.stringify(wishlist));  //for use in my profile area
            }
            else
            {
                sessionStorage.removeItem('user-wishlist');  //clear the wishlist if none is found
            }    
        }
        setWishlist();  //Set wishlist view
    }
}            




        
