const express = require("express");
const router = express.Router();
router.use(express.json());
const utils = require("./Utils");

//Gets
router.get("/practiceChat/:id",async (req,res) => {
   
    let id = req.params.id
    let chat = await utils.getDocumentFromCollectionById("practicesChats",id);

    if(chat != null){
        console.log("Chat devuelto");
        res.send(chat);
    }else{
        console.log("No hay ningun chat con ese id (Get)");
        res.sendStatus(404);
    }
    res.end();
});

//Posts
router.post("/practiceChat",async (req,res) => {
    utils.saveDocument("practicesChats",req.body,res,"Chat insertado","Error al introducir el chat");
});

//Deletes
router.delete("/practiceChat/:id",async (req,res) => {
    utils.deleteFromCollectionById("practicesChats",req.params.id,res,"Chat eliminado","No se ha podido eliminar el Chat");
});

//Put
router.put("/practiceChat",async (req,res) => {
    utils.updateDocument("practicesChats",req.body,res,"Chat actualizado","Error al actualizar el chat");
});

module.exports = router;
