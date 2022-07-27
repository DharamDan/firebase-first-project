let uid;
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
   uid = user.uid;
   console.log(uid  )
      if(!user.emailVerified){
      window.location.href = "EmailVerified.html"

    }   
  } else {
    window.location.href = "./SignIn.html"
    
  }
});

let FirstName2 = document.getElementById("FirstName2")
let select2 = document.getElementById("select2")
let MobNumber = document.getElementById("MobNumber")
let Password = document.getElementById("Password")
let CNIC = document.getElementById("CNIC")
let wizardPicturePreview = document.getElementById("wizardPicturePreview")




setTimeout(() => {
    const db = firebase.firestore();
    db.collection("users/").doc(uid).get().then((inputdata)=>{
        var mydata = inputdata.data()
        console.log(mydata)
        FirstName2.innerHTML = mydata.FirstName
        select2.innerHTML =  mydata.select
        MobNumber.setAttribute("value", mydata.MobNumber)
        Password.setAttribute("value", mydata.Password)
        CNIC.setAttribute("value", mydata.CNIC)

        if(mydata.profileImage === ""){
          wizardPicturePreview.setAttribute("src","https://www.citypng.com/public/uploads/preview/hd-profile-user-round-blue-icon-symbol-transparent-png-11639594354dzabzsbpuv.png")


        }
        else{
          wizardPicturePreview.setAttribute("src",mydata.profileImage)
        }
        
    


    })
}, 5000);


 
let  profile =(e)=>{
  
  let file =  e.target.files[0]
  console.log(file)
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child(`users/${file.name}`).put(file);
  uploadTask.on('state_changed', 
  
  (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    
  }, 
  (error) => {
    console.log(error)
    
  }, 
  () => {
    
    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
      console.log(url)
      firebase.firestore().collection("users/").doc(uid).update({profileImage:url }).then(()=>{
        window.location.reload()
      })

        
      


     
    });
  }
);
    
}

let update = ()=>{
  firebase.firestore().collection("users").doc(uid).update({
    
    MobNumber:MobNumber.value,
    Password: Password.value,
    CNIC:CNIC.value}).then(()=>{

  alert("update")
  MobNumber.innerHTML = MobNumber.value
  Password.innerHTML = Password.value
  birth.innerHTML = birth.value
  CNIC.innerHTML = CNIC.value

  
})
}

