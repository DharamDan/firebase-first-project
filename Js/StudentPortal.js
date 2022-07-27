let message = document.getElementById("message")


let uid;
firebase.auth().onAuthStateChanged((user) => {

  if (user) {
    uid = user.uid;
    console.log(uid)
    if (!user.emailVerified) {
      window.location.href = "EmailVerified.html"

    }
  } else {
    window.location.href = "./SignIn.html"

  }
});

let select = document.getElementById("select")
let FirstName = document.getElementById("FirstName")
let LastName = document.getElementById("LastName")
let CNIC = document.getElementById("CNIC")



setTimeout(() => {
  const db = firebase.firestore();
  db.collection("users/").doc(uid).get().then((inputdata) => {
    var mydata = inputdata.data()
    console.log(mydata)
    select.innerHTML = mydata.select
    FirstName.innerHTML = mydata.FirstName
    LastName.innerHTML = mydata.LastName
    CNIC.innerHTML = mydata.CNIC
    select.innerHTML = mydata.select




  })
}, 2000);

let challan = "";


let profile = (e) => {



  let file = e.target.files[0]
  console.log(file)
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child(`userchallan/${file.name}`).put(file);
  uploadTask.on('state_changed',

    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

    },
    (error) => {
      console.log(error)

    },
    () => {

      uploadTask.snapshot.ref.getDownloadURL().then((DownloadURL) => {
        challan = DownloadURL;
        console.log(DownloadURL)
        // update 

      });
    }
  );

}

let update = () => {
  if (challan === "") {
    alert
      ("upload your challan")
  }
  else {
    firebase.firestore().collection("users/").doc(uid).update({  
      challan : challan,
      pending: true,
      reject: false,
      approve: false
    
    }).then(()=>{
      alert("challan uploaded")
    })
  
  }
}









