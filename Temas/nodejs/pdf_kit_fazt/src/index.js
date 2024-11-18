import express from "express";
import { router } from "./routes/index.routes.js";

const app = express(),
    port = 3000;
app.use(router);
app.listen(port, () => {
    console.log("Iniciando el servidor en el puerto 3000");
});
