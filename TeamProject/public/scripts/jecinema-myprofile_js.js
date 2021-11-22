$(document).ready(function() {
    //Store Database values to session
    getWishlistFromDatabase();
    const userEmail = sessionStorage.getItem("user-email");
    let profilepic = sessionStorage.getItem("user-picture");
    const userFullName = sessionStorage.getItem("user-name");
    getDatabase(userEmail);
    setProfilePhoto();
    autofillForm(userEmail, userFullName);
  

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
        $("#SaveBttn").prop("disabled", true);  //prevent double posts
    });
    

    function processErrors(xhr, textStatus, errorThrown) 
    {
        console.log('Validation errors');
        $("#SaveBttn").prop("disabled", false);  //re-enable for re-use 
    }

        
    

    function processResults(response, status, xhr) 
    {    //set session variables and redirect to login immediately
        $("#SaveBttn").prop("disabled", false);  //re-enable for re-use 
        sessionStorage.setItem("user-name", response.customerName);
        sessionStorage.setItem("user-email", response.customerEmail);
        window.location.reload;
    }

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
        console.log(response.customerName);
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
    const wishlist = JSON.parse(sessionStorage.getItem("user-wishlist"));//no brackets
    let stringToMatch;  //match image source of image with specifically formatted version of movie name that would match
    
    var i,j;
    for (i = 0; i < wishlist.length; i++) 
    {
        stringToMatch = "pictures/"; 
        stringToMatch += wishlist[i].movie_name.split(" ").join("").toLowerCase().replace(/[^a-zA-Z0-9]/g, '')+ "_poster.jpg"; 
        
        //Hide All Movies
        $("#movie1").hide();
        $("#movie2").hide();
        $("#movie3").hide();
        $("#movie4").hide();
        $("#movie5").hide();
        $("#movie6").hide();

        //Show movies matching db
        for(j=1; j < 7;  j++)
        {
            elementToEdit = "#movie" + j;

            // $(elementToEdit).hide();
            if(stringToMatch === $(elementToEdit).attr('src') ) 
            {
                console.log("Match");
                $(elementToEdit).show();
            }
            
            
        }
    }
    console.log("done");
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
			const response = JSON.parse(xhttp.response);  //response as JSON obj
			const wishlist = response.wishlist;
			
			sessionStorage.setItem("user-wishlist", JSON.stringify(wishlist));  //for use in my profile area
            setWishlist();
        }
    }
}            



//deactivate account popup dialog

$('#DeactivateBttn').click(function()
{    
   let answer = prompt("Enter 'delete' to deactivate this account");
   if(answer !== "delete") {
        let newprompt = alert("You did not enter delete. This account will not be deleted");
   }    
   else {
       //delete account here - drop from table
   }
});