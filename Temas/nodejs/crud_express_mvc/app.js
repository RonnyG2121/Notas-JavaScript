import express, { Router } from "express";
import nunjucks from "nunjucks";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import router from "./controllers/taskController.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
const port = 3000;

// Definicion del directorio de donde se obtine la vista
app.set('views', path.join(__dirname, 'views'));
// Carga del motor de vista Nunjucks
app.set('view engine', 'njk');
nunjucks.configure('views', {
  watch: true,
  autoescape: true,
  express: app
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(router);


app.listen(port, () => {
    console.info(`Servidor corriendo en el puerto ${port}`);

    // console.info(path.join(__dirname, "public"));

});