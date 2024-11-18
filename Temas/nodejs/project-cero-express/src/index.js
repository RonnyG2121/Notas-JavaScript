import express from "express";
import ejs from "ejs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
app.listen(3000, () => {
    // console.log(dirname(fileURLToPath(import.meta.url)));
    console.log("Ejecutándose en el puerto 3000")
});

// ajustes
const __dirname = dirname(fileURLToPath(import.meta.url));


app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

