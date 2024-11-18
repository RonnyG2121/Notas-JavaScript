const fs = require("node:fs/promises");
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });
const archivo = "db.json";

const agregarTarea = async () => {
    // Preguntar los detalles de la tarea al usuario
    const nombre = await rl.question("Nombre: ");
    const descripcion = await rl.question("Descripción: ");
    const prioridad = await rl.question("Prioridad (del 1 al 5): ");
    const completada = await rl.question("¿Completada? (sí/no): ");
    const prioridadNumero = parseInt(prioridad);

    // Crear el objeto tarea
    const tarea = {
        nombre,
        descripcion,
        prioridad: prioridadNumero,
        completada: completada.toLowerCase() === "si" || completada === "sí" ? true : false
    };

    rl.close();

    try {
        // Intentar leer el archivo JSON si existe
        let arregloTareas = [];
        try {
            const data = await fs.readFile(archivo, "utf-8");
            // Verificar si el archivo está vacío
            if (data.trim().length > 0) {
                arregloTareas = JSON.parse(data);  // Parsear solo si no está vacío
            }
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
            console.log("El archivo no existe, se creará uno nuevo.");
        }

        // Agregar la nueva tarea al arreglo
        arregloTareas.push(tarea);

        // Escribir el arreglo actualizado en el archivo
        await fs.writeFile(archivo, JSON.stringify(arregloTareas, null, 2), "utf-8");
        console.log("Tarea añadida correctamente.");
    } catch (error) {
        console.error("Error al procesar el archivo:", error);
    }

    return tarea;
}


const listarTareas = async () => {
    try {
        const data = await fs.readFile(archivo, "utf-8");
        // console.log(typeof data);
        if (data.length > 0) {
            const json = JSON.parse(data);
            // console.log(json);
            json.forEach((element, index) => {
                console.log(element);
            });

        } else {
            console.log("No hay tareas por hacer");
        }
    } catch (error) {
        console.log(error);
    }

}


const completarTarea = async () => {

    const indice = await rl.question("Ingrese el número de la tarea a completar: ");

    try {
        const data = await fs.readFile(archivo, 'utf-8');
        if (data.length > 0) {
            const json = JSON.parse(data);

            // Recorremos el arreglo y cambiamos la propiedad de la tarea correspondiente
            json.forEach((element, index) => {
                if (index + 1 === parseInt(indice)) {  // Convertimos `indice` a número
                    element.completada = true;
                    console.log(`La tarea "${element.descripcion}" fue completada exitosamente`);
                }
            });

            // Guardamos el arreglo actualizado en el archivo JSON
            await fs.writeFile(archivo, JSON.stringify(json, null, 2), 'utf-8');
            console.log("Archivo actualizado exitosamente.");
        }
    } catch (error) {
        console.log("Error al leer o escribir el archivo:", error);
    }

    await rl.close();
}


    const main = async () => {
    const opcion = await rl.question("Elija una opción");
    switch (opcion) {
        case "1":
            await agregarTarea();
            break;
        case "2":
            await listarTareas();
            break;
        case "3":
            await completarTarea();
            break;
        case "4":
            console.log("Hasta luego");
            break;

        default:
            console.log("Opción no válida");
            break;
    }
    rl.close();
}

main();