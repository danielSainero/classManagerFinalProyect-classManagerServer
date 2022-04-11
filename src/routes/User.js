const express = require("express");
const app = require("../../app");
const router = express.Router();
router.use(express.json());
const utils = require("./Utils")


//Gets
router.get("/users",async (req,res) => {
    let list;
    list = await utils.getListFromCollection("users");
    res.send(list);
    res.end();
    console.log("Empleados devueltos");
});


router.get("/user/:id",async (req,res) => {
   

    let id = parseInt(req.params.id)
    let user = await utils.getDocumentFromCollectionById("users",id);

    if(user != null){
        console.log("Empleado devuelto");
        res.send(user);
    }else{
        console.log("No hay ningun empleado con ese id (Get)");
        res.sendStatus(404);
    }
    res.end();
});

module.exports = router;
