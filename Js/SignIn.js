let email = document.getElementById("email")
let password = document.getElementById("password")
let message2 = document.getElementById("message2")


 function SignIn ()  {


    if(email.value === ""){
        message2.innerHTML ="Type your Email"
        message2.style.color="red";
    }
    else if(password.value === ""){
        message2.innerHTML ="Type your Password"
        message2.style.color="red";
    }
    else{
        firebase.auth().signInWithEmailAndPassword(email.value,password.value)
        .then((userCredential) => {
            var user = userCredential.user;
           message2.innerHTML ="Succesfully"
           message2.style.color ="green"
          
           setTimeout(() => {
               message2.style.display = "none"
            if(!user.emailVerified){
              window.location.href = "EmailVerified.html"
             }
             else{
           
              window.location.href = "StudentPortal.html"
            }   
         }, 2000);

          
         
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            message2.innerHTML = errorMessage
            message2.style.color="red";
          });
        
    }

}