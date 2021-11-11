$(document).ready(function(){
    const userFullName = sessionStorage.getItem("user-name");
    const userEmail = sessionStorage.getItem("user-email");
    uploadFile();
    setProfilePhoto();
    autofillForm(userEmail, userEmail);
  });

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
        const profilepic = sessionStorage.getItem("user-picture");
        $("#profile-pic").attr("src", profilepic);
        $("#user-picture").attr("src", profilepic);
    }
    else
    {
        $("#user-picture").attr("src", "pictures/profilepic.jpg");  //Revert to default image
    }

}  


function autofillForm(userEmail, userFullName)
{
    if(userEmail !== null)
    {
        $("#email").val(userEmail);
    }
    if(userFullName !== null)
    {
        $("#name").val(userFullName);
    }
}