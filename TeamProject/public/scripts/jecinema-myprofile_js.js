$(document).ready(function(){

    uploadFile();
    setProfilePhoto();
    autofillForm();
    $("#SaveBttn").click(function ()
    {
        editProfile();
    });
  });

const userFullName = sessionStorage.getItem("user-name");
const userEmail = sessionStorage.getItem("user-email");
let editedFullName = $("#name").val();
let editedEmail = $("#email").val();


populateFromDatabase()
{
    //
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
            //Post image to db
        }

        reader.readAsDataURL(image);
    }
}

function setProfilePhoto()
{ 
    if(sessionStorage.getItem("user-picture") !== null)
    {
        const profilepic = sessionStorage.getItem("user-picture");
        $("#profile-pic").attr("src", profilepic);
        $("#user-picture").attr("src", profilepic);
    }
    else
    {
        $("#user-picture").attr("src", "pictures/profilepic.jpg");  //Revert to default image
    }

}  


function autofillForm()
{
    if(userEmail !== null)
    {
        $("#email").val(userEmail);
    }
    if(userFullName !== null)
    {
        $("#name").val(userFullName);
    }
    //Pull password from db

}


function editProfile()
{
    editedFullName = $("#name").val();
    editedEmail = $("#email").val();
    sessionStorage.setItem("user-name", "DefaultValue")
    sessionStorage.setItem("user-email", "DefaultValue");
    
    //console.log(editedFullName);
    console.log(userEmail);
    console.log(editedEmail);
    if(userFullName !== editedFullName  || userEmail !== editedEmail)
    {
        //Post for database to update values
        console.log("Y");
        
        /*UPDATE customer
        SET customer_name = editedFullName,
        WHERE customer_email = userEmail;*/
    }
    else
    {
        alert("No changes made");
    }

}