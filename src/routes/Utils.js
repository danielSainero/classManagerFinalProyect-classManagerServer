
const app = require("../../app");
const admin = require('firebase-admin');


//Funciones auxiliares: get
async function getListFromCollection(collectionName){
    const collection =  await app.getDatabase().collection(collectionName).get();
    let list = new Array;
    collection.forEach((doc) => {
         list.push(doc.data())
    });
    return list; 
}

async function getDocumentFromCollectionById(collectionName,id){
    const collection =  await app.getDatabase().collection(collectionName).doc(id).get();
    let response = collection.data()
   
    return response;
}

async function getListFromCollectionByListOfIds(collectionName,listOfIds){
    const list = new Array;
    const newListOfIds = Array(listOfIds);
    newListOfIds.forEach(it => {
       list.push(getDocumentFromCollectionById(collectionName,it))
    });

    let document;
    list.forEach((doc) => {
        document = doc.data();
    })
    return document;
}


//Funciones auxiliares: Posts
async function saveDocument(collectionName,newDocument,response,succesMessage,errorMessage){
    
    let document = app.getDatabase().collection(collectionName).doc()
    newDocument.id = document.id
    let saveDocument = await document.set(newDocument)
    /*
    if(saveDocument != null) {
        console.log(errorMessage)
        response.sendStatus(403);
    }
    else {
        console.log(succesMessage)
        response.send(saveDocument);

    }
    */
    console.log(succesMessage)

    response.send(newDocument);
    response.end();
}

//Funciones auxiliares: Put
async function updateDocument(collectionName,newDocument,response,succesMessage,errorMessage){
    
    let document = await app.getDatabase().collection(collectionName).doc(newDocument.id).set(newDocument)
    console.log(succesMessage)
    response.send(newDocument);
    response.end();
}

//Funciones Deletes
async function deleteFromCollectionById(collectionName,id,response,succesMessage,errorMessage){


   let deleteResult = app.getDatabase().collection(collectionName).doc(id).delete()

    console.log(succesMessage);
    response.sendStatus(200);
    response.end();
}

exports.updateDocument = updateDocument
exports.getListFromCollectionByListOfIds = getListFromCollectionByListOfIds
exports.deleteFromCollectionById = deleteFromCollectionById
exports.saveDocument = saveDocument;
exports.getDocumentFromCollectionById = getDocumentFromCollectionById;
exports.getListFromCollection = getListFromCollection;










