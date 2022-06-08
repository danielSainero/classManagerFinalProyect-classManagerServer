

const express = require("express");
const router = express.Router();
router.use(express.json());
const admin = require('firebase-admin');
const app = require("../../app");
const utils = require("./Utils");


const actionCodeSettings = {

  url: 'https://console.firebase.google.com/',
  handleCodeInApp: true,
  android: {
    packageName: 'com.example.classmanagerandroid',
    installApp: true,
    minimumVersion: '12',
  },

};

//Authentication
router.post("/register",async (req,res) => {
    var newUser = {}

    admin.auth()
      .createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        //phoneNumber: '+11234567890',
        displayName: 'Default name',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/class-manager-58dbf.appspot.com/o/user%2FdefaultUserImg.png?alt=media&token=6bc2760b-bd3c-4ef9-a6c1-613f9db9d4c3',
        disabled: false
      })
      .then(function(userRecord) { 
        newUser = {
          "id": userRecord.uid,
          "email": userRecord.email,
          "courses": new Array(),
          "classes": new Array(),
          "name": "userName",
          "imgPath": "gs://class-manager-58dbf.appspot.com/user/defaultUserImg.png",
          "description": "myDescription",
          "password": req.body.password
        } 

        app.getDatabase().collection("users").doc(userRecord.uid).set(newUser)
        res.send(newUser);
        res.end();
        console.log('Successfully created new user:', userRecord.uid);
      })
      .catch(function(error) {
        console.log('Error creating new user:', error);
        res.sendStatus(404);
        res.end();
      });
});


router.post("/login",async (req,res) => {
  admin.auth()
  .getUserByEmail(req.body.email)
  .then(async (userRecord) => {
    let user =  await  utils.getDocumentFromCollectionById("users",userRecord.uid);

    if(user.password == req.body.password) {
      res.send(user)
      res.end();
    }
    else {
      console.log("Contraseña inválida")
      res.sendStatus(404)
    }
   
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
    res.sendStatus(404)
    res.end();
  });  
});

router.post("/deleteAccount/:uid", async (req,res) => {
  let uid = req.params.uid
    console.log(uid);
    admin.auth()
    .deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted account');
      app.getDatabase().collection("users").doc(uid).delete()

    })
    .catch((error) => {
      console.log('Error deleting account:', error);
    });
    res.end();
});

router.post("/updatePasswordByEmail/:email", async (req,res) => {
  
  let userEmail = req.params.email
    admin.auth()
    .generatePasswordResetLink(userEmail)
    .then((link) => {
      console.log('email sent!');

      return sendCustomPasswordResetEmail(userEmail, displayName, link);
    })
    .catch((error) => {
      console.log(error)
    });
    
});


function updateUser() {
  getAuth()
  .updateUser(uid, {
    email: 'modifiedUser@example.com',
    phoneNumber: '+11234567890',
    emailVerified: true,
    password: 'newPassword',
    displayName: 'Jane Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: true,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });
}


function updateEmail() {
  admin.auth().createUser.updateEmail

  user.updateEmail("user@example.com").then(() => {
    // Update successful
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
  });
}

module.exports = router;
