
//Server
const express = require('express');
const server = express();
const port = 8080;

//Database
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./data/keys/key-firebase.json');
const admin = require('firebase-admin');


//Create references to routes
const users = require("./src/routes/User");
const authentication = require("./src/routes/Authentication");
const course = require("./src/routes/Course");
const classFile = require("./src/routes/Class");
const events = require("./src/routes/Event");
const practice = require("./src/routes/Practice");
const chat = require("./src/routes/Chat");

//Connect to database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://class-manager-58dbf-default-rtdb.firebaseio.com",
  storageBucket: "gs://class-manager-58dbf.appspot.com/"
});

const db = getFirestore();
const storage = admin.storage()


//Rutear las peticiones
server.use("/api", users);
server.use("/api", authentication);
server.use("/api", course);
server.use("/api", classFile);
server.use("/api", events);
server.use("/api", practice);
server.use("/api", chat);

//Iniciar servidor
server.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
});


//Obtener auth
function getDatabase(){
  return db;
}



async function test(email , password) {
 
  admin.auth().createUser({
    email: email,
    emailVerified: false,
    password: password,
    //phoneNumber: '+11234567890',
    displayName: 'Default name',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false
   })
   .then(function(userRecord) {
     // See the UserRecord reference doc for the contents of userRecord.
     console.log('Successfully created new user:', userRecord.uid);
   })
    .catch(function(error) {
     console.log('Error creating new user:', error);
    });
}
exports.test = test;
exports.getDatabase = getDatabase;

