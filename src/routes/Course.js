const express = require("express");
const router = express.Router();
router.use(express.json());
const utils = require("./Utils")

//Gets
router.get("/course/:id",async (req,res) => {
   
    let id = req.params.id
    let course = await utils.getDocumentFromCollectionById("course",id);

    if(course != null){
        console.log("Curso devuelto");
        res.send(course);
    }else{
        console.log("No hay ningun curso con ese id (Get)");
        res.sendStatus(404);
    }
    res.end();
});



//To do
router.get("/courses/:listOfIds",async (req,res) => {
   
    let listOfIds = Array(req.params.listOfIds)
    let course = await utils.getListFromCollectionByListOfIds("course",listOfIds);

    if(courses != null){
        console.log("Cursos devueltos");
        res.send(course);
    }else{
        console.log("No se ha podido obtener la lista de cursos (Get)");
        res.sendStatus(404);
    }
    res.end();
});


//Posts
router.post("/course",async (req,res) => {
    utils.saveDocument("course",req.body,res,"Curso insertado","Error al introducir el curso");
});


//Put
router.put("/course",async (req,res) => {
    utils.updateDocument("course",req.body,res,"Curso actualizado","Error al actualizar el curso");
});

//Deletes
router.delete("/course/:id",async (req,res) => {
    utils.deleteFromCollectionById("course",req.params.id,res,"Curso eliminado","No se ha podido eliminar el curso");
});

/*

//Others Not work
router.post("/addNewMember/:idOfUser/:rol/:idOfCourse",async (req,res) => {

    let course = await utils.getDocumentFromCollectionById("course",req.params.idOfCourse);
    let user = await utils.getDocumentFromCollectionById("users",req.params.idOfUser);

    user.courses.push(req.params.idOfUser);
    utils.updateDocument("users",user,res,"Usuario actualizado","Error al actualizar el usuario");

    course.users.push({
        "id": req.params.idOfUser,
        "rol": req.params.rol
    });

    utils.updateDocument("course",course,res,"Curso actualizado","Error al actualizar el curso");
    res.sendStatus(course);
    res.end();


});



//Others
router.post("/addNewMember/:idOfCourse",async (req,res) => {

    let rolUser = req.body.rolUser;
    console.log
    let course = await utils.getDocumentFromCollectionById("course",req.params.idOfCourse);
    let user = await utils.getDocumentFromCollectionById("users",rolUser.id);
    user.courses.push(rolUser.id);


    

    utils.updateDocument("users",user,res,"Usuario actualizado","Error al actualizar el usuario");

    course.users.push(rolUser);

    utils.updateDocument("course",course,res,"Curso actualizado","Error al actualizar el curso");
    console.log("Usuario añadido")
    res.sendStatus(course);
    res.end();


});
*/

module.exports = router;
