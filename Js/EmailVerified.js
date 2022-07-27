let email1 = document.getElementById("email1")
firebase.auth().onAuthStateChanged((user) => {
if (user) {
  email1.innerHTML = user.email
  if(user.emailVerified){
    window.location.href="StudentPortal.html"
  }
} else {
 window.location.href  = "SignIn.html"
}
});




let emailverified = ()=>{
    firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
     alert("email Verified")
    });
  }
  function homepage() {
    window.location.reload();
}