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
    res.json({ title: "Todas las tareas", dbTareas: tareas });
});

/* Añade contenido */
router.post("/add-task", (req, res) => {
    // Obteniendo el contenido de la solicitud
    let { nombre, descripcion, completa } = req.body;
    // let id = uniqueId;
    tareas.push({ id: v4(), nombre, descripcion, completa: completa });
    res.json({Mensaje: "Tarea agregada con éxito"});
});

/* edita el contenido */
router.put("/edit-task/:id", (req, res) => {
    let id = req.params.id;
    let tarea = tareas.findIndex((tarea) => tarea.id === id);

    if (tarea === -1) {
        res.json({mensaje: "No fue posible obtener la tarea"});
    } else {
        let { nombre, descripcion, completa } = req.body;
        tareas[tarea].nombre = nombre;
        tareas[tarea].descripcion = descripcion;
        tareas[tarea].completa = completa;
        res.json({tarea: tarea});
    }

});

/* completar el contenido */
router.patch("/complete-task/:id", (req, res) => {
    let id = req.params.id;
    let tarea = tareas.find((tarea) => tarea.id === id);

    if (!tarea) {
        res.json({mensaje: "No se ppudo obtener la tarea para completarla"});
    } else {
        tarea.completa = true;
        res.json({tarea: tarea});
    }
});

/* Eliminar el contenido */
router.delete("/delete-task/:id", (req, res) => {
    let id = req.params.id;

    tareas = tareas.filter((tarea) => tarea.id !== id);
    res.json({mensaje: `La tarea con el id ${tarea.id} fue eliminada con éxito`, tareas: tareas});
});


export default router;