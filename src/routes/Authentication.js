
const express = require("express");
const router = express.Router();
router.use(express.json());
const admin = require('firebase-admin');


//Authentication
router.post("/register",async (req,res) => {
    
    admin.auth()
    .createUser({
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
      //phoneNumber: '+11234567890',
      displayName: 'Default name',
      photoURL: '',
      disabled: false
    })
    .then(function(userRecord) {
      
      console.log('Successfully created new user:', userRecord.uid);
    })
      .catch(function(error) {
      console.log('Error creating new user:', error);
      });
      res.end();
});

router.post("/login",async (req,res) => {
  admin.auth()
  .getUsers([
    { email: req.body.email },
   // { password: req.baseUrl.password}
  ])
  .then((getUsersResult) => {
    console.log('Successfully fetched user data:');
    getUsersResult.users.forEach((userRecord) => {
      console.log(userRecord);
    });

    console.log('Unable to find users corresponding to these identifiers:');
    getUsersResult.notFound.forEach((userIdentifier) => {
      console.log(userIdentifier);
    });
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });

    res.end();
});

function deleteUser(uid) {
    admin.auth()
    .deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
}

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

module.exports = router;
