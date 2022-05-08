const express = require("express");
const router = express.Router();
router.use(express.json());
const utils = require("./Utils");


//Gets
router.get("/event/:id",async (req,res) => {
   
    let id = req.params.id
    let event = await utils.getDocumentFromCollectionById("event",id);

    if(event != null){
        console.log("Evento devuelto");
        res.send(event);
    }else{
        console.log("No hay ningun evento con ese id (Get)");
        res.sendStatus(404);
    }
    res.end();
});


//Post
router.post("/event",async (req,res) => {
    utils.saveDocument("event",req.body,res,"Evento creado","Error al crear el evento");
});



//Put
router.put("/event",async (req,res) => {
    utils.updateDocument("event",req.body,res,"Evento actualizado","Error al actualizar el evento");
});


//Deletes
router.delete("/event/:id",async (req,res) => {
    utils.deleteFromCollectionById("event",req.params.id,res,"Evento eliminado","No se ha podido eliminar el evento");
});


module.exports = router;
