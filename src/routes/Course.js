const express = require("express");
const app = require("../../app");
const router = express.Router();
router.use(express.json());
const utils = require("./Utils")

router.get("/course/:id",async (req,res) => {
   
    let id = parseInt(req.params.id)
    let course = await utils.getDocumentFromCollectionById("course",id);

    if(user != null){
        console.log("Curso devuelto");
        res.send(user);
    }else{
        console.log("No hay ningun curso con ese id (Get)");
        res.sendStatus(404);
    }
    res.end();
});