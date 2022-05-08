const express = require("express");
const router = express.Router();
router.use(express.json());
const utils = require("./Utils");

router.get("/practice/:id",async (req,res) => {
   
    let id = req.params.id
    let item = await utils.getDocumentFromCollectionById("practices",id);

    if(item != null){
        console.log("Practica devuelta");
        res.send(item);
    }else{
        console.log("No hay ninguna practica con esa id (Get)");
        res.sendStatus(404);
    }
    res.end();
});

//Posts
router.post("/practice",async (req,res) => {
    utils.saveDocument("practices",req.body,res,"Práctica insertada","Error al introducir la práctica");
});

//Deletes
router.delete("/practice/:id",async (req,res) => {
    utils.deleteFromCollectionById("practices",req.params.id,res,"Práctica eliminada","No se ha podido eliminar la práctica");
});


module.exports = router;
