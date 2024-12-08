import { Router } from "express";
import { v4 } from "uuid";

const router = Router();


let tareas = [
    {
        id: v4(),
        nombre: "Tarea1",
        descripcion: "Esta es la primera tarea y es de carácter de urgencia.",
        completa: false
    },
    {
        id: v4(),
        nombre: "Tarea2",
        descripcion: "Esta es la segunda tarea.",
        completa: true
    },
    {
        id: v4(),
        nombre: "Tarea3",
        descripcion: "Esta es la tercera tarea y es de carácter de urgencia.",
        completa: false
    },
    {
        id: v4(),
        nombre: "Tarea4",
        descripcion: "Esta es la cuarta tarea.",
        completa: true
    }];


/* obtener todo el contenido */
router.get("/", (req, res) => {
    res.render("index", { title: "Todas las tareas", dbTareas: tareas });
});

/* Añade contenido */
router.get("/add-task", (req, res) => {
    res.render("add", { title: "Agregar tarea" });

});

router.post("/add-task", (req, res) => {
    // Obteniendo el contenido de la solicitud
    let { nombre, descripcion, completa } = req.body;
    // let id = uniqueId;
    tareas.push({ id: v4(), nombre, descripcion, completa: completa });
    res.redirect("/");
});


/* edita el contenido */
router.get("/edit-task/:id", (req, res) => {

    let id = req.params.id;
    let tarea = tareas.find((tarea) => tarea.id === id);

    console.log(tarea);

    if (!tarea) {
        res.redirect("/");
    } else {
        res.render("edit", { title: `Editar tarea`, dbTareas: tarea });
    }

});

router.post("/edit-task/:id", (req, res) => {
    let id = req.params.id;
    let tarea = tareas.findIndex((tarea) => tarea.id === id);

    if (tarea === -1) {
        res.redirect("/");
    } else {
        let { nombre, descripcion, completa } = req.body;
        tareas[tarea].nombre = nombre;
        tareas[tarea].descripcion = descripcion;
        tareas[tarea].completa = completa;
        res.redirect("/");
    }

});

/* completar el contenido */
router.get("/complete-task/:id", (req, res) => {
    let id = req.params.id;
    let tarea = tareas.find((tarea) => tarea.id === id);

    if (!tarea) {
        res.redirect("/");
    } else {
        tarea.completa = true;
        res.redirect("/");
    }
});

/* Eliminar el contenido */
router.get("/delete-task/:id", (req, res) => {
    let id = req.params.id;

    tareas = tareas.filter((tarea) => tarea.id !== id);
    res.redirect("/");
});


export default router;