    
    const passwordField  = document.getElementById("password");
    const errorMessage = document.getElementById("error_message");

    passwordField.addEventListener('invalid', function (e){
        console.log("Works");
        errorMessage.style.visibility = "visible";
    });

    
       
