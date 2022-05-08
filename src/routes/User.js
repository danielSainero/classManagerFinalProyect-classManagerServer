const express = require("express");
const router = express.Router();
router.use(express.json());
const utils = require("./Utils");


//Gets
router.get("/users",async (req,res) => {
    let list;
    list = await utils.getListFromCollection("users");
    res.send(list);
    res.end();
    console.log("Usuarios devueltos");
});


router.get("/user/:id",async (req,res) => {
   
    let id = req.params.id
    let user = await utils.getDocumentFromCollectionById("users",id);

    if(user != null){
        console.log("Usuario devuelto");
        res.send(user);
    }else{
        console.log("No hay ningun usuario con ese id (Get)");
        res.sendStatus(404);
    }
    res.end();
});

//Mirar como validar la respuesta

//Posts
router.post("/user",async (req,res) => {
     utils.saveDocument("users",req.body,res,"Usuario insertado","Error al introducir el usuario");
});

//Put
router.put("/user",async (req,res) => {
    utils.updateDocument("users",req.body,res,"Usuario actualizado","Error al actualizar el usuario");
});

//Deletes
router.delete("/user/:id",async (req,res) => {
    utils.deleteFromCollectionById("users",req.params.id,res,"Usuario eliminado","No se ha podido eliminar el usuario");
});


module.exports = router;
