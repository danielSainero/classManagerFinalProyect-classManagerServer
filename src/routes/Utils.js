
const app = require("../../app");
const admin = require('firebase-admin');

async function getListFromCollection(collectionName){
    const collection =  await app.getDatabase().collection(collectionName).get();
    let list;
    collection.forEach((doc) => {
         list.push(doc.data())
    });
    console.log(list)
    return list; 
}

async function getDocumentFromCollectionById(collectionName,id){
    const list =  await app.getDatabase().collection(collectionName).get(id);

    let document;
    list.forEach((doc) => {
        document = doc.data();
    })
    return document;
}

exports.getDocumentFromCollectionById = getDocumentFromCollectionById;
exports.getListFromCollection = getListFromCollection;