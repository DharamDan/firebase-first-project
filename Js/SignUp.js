let uid;


let FirstName = document.getElementById("FirstName")
let LastName = document.getElementById("LastName")
let MobNumber = document.getElementById("Mob-Number")
let Email = document.getElementById("Email")
let Password = document.getElementById("Password")
let birth = document.getElementById("birth")
let CNIC = document.getElementById("CNIC")
let select = document.getElementById("select")
let message = document.getElementById("message")







let SignUp = ()=>{
  if(FirstName.value === ""){
    message.innerHTML = "Type your First Name"
    message.style.color="red"
  }
  else if(LastName.value === ""){
    message.innerHTML = "Type your Last Name"
    message.style.color="red"

  }
  else if(MobNumber.value === ""){
    message.innerHTML = "Type your Mob Number"
    message.style.color="red"

  }
  // else if(date.value === ""){
  //   message.innerHTML = "Type your Date"
  //   message.style.color="red"
    
  // }
  else if(CNIC.value === ""){
    message.innerHTML = "Type your  CNIC"
    message.style.color="red"
    
  }
  else if(Email.value === ""){
    message.innerHTML = "Type your Email Name"
    message.style.color="red"

  }
  else if(Password.value === ""){
    message.innerHTML = "Type your Password"
    message.style.color="red"

  }
  else{
    let userObj = {
     FirstName: FirstName.value,
     LastName: LastName.value,
     MobNumber: MobNumber.value,
     Email:  Email.value,
     password: Password.value,
     birth: birth.value,
     CNIC: CNIC.value,
     select: select.value,
     profileImage: "",
    
    }
    console.log(userObj)
   
    firebase.auth().createUserWithEmailAndPassword(userObj.Email,userObj.password)
  .then((userCredential) => {
    var user = userCredential.user;
    firebase.firestore().collection("users/").doc(user.uid).set(userObj)
    console.log(userObj)
    user.sendEmailVerification()
    message.innerHTML = "successfully"
    message.style.color="green"
   
    setTimeout(() => {
        message.style.display="none"
        window.location.href = "EmailVerified.html"
    }, 2000);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
}
}