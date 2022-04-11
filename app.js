//Server
const express = require('express');
const server = express();
const port = 8080;

//Database
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./data/keys/key-firebase.json');


//Connect to database
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

//Create references to routes
const users = require("./src/routes/User")


//Rutear las peticiones
server.use("/api", users)


//Iniciar servidor
server.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
});

//Obtener la base de datos
function getDatabase(){
  return db;
}

exports.getDatabase = getDatabase;