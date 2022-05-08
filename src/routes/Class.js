const express = require("express");
const router = express.Router();
router.use(express.json());
const utils = require("./Utils")


router.get("/class/:id",async (req,res) => {
   
    let id = req.params.id
    let newClass = await utils.getDocumentFromCollectionById("classes",id);

    if(newClass != null){
        console.log("Clase devuelta");
        res.send(newClass);
    }else{
        console.log("No hay ninguna clase con esa id (Get)");
        res.sendStatus(404);
    }
    res.end();
});

//Posts
router.post("/class",async (req,res) => {
    utils.saveDocument("classes",req.body,res,"Clase insertada","Error al introducir la clase");
});

//Put
router.put("/class",async (req,res) => {
    utils.updateDocument("classes",req.body,res,"Clase actualizada","Error al actualizar la clase");
});

//Deletes
router.delete("/class/:id",async (req,res) => {
    utils.deleteFromCollectionById("classes",req.params.id,res,"Clase eliminada","No se ha podido eliminar la clase");
});

module.exports = router;
