import express from "express";
import fs from "fs/promises";
import path from "path";
import nunjucks from "nunjucks";
import MarkdownIt from "markdown-it";
import cookieParser from "cookie-parser";
import fm from "front-matter";
import morgan from "morgan";


const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = process.cwd();

// Definicion del directorio de donde se obtine la vista
app.set('pages', path.join(__dirname, 'pages'));
// Carga del motor de vista Nunjucks
app.set('view engine', 'njk');
nunjucks.configure('pages', {
    watch: true,
    autoescape: false,
    express: app
})

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

const pageDirname = path.join(__dirname, "pages");
const files = await fs.readdir(pageDirname);

// console.log(files);
// lógica para manejar las rutas con los archivos que no sean .njk
for (let file of files) {
    // console.log(file);
    let filePath = path.join(pageDirname, file);
    // console.log(filePath);
    let extFile = path.extname(file);
    // console.log(extFile);

    if (extFile === ".njk" || extFile === ".md" || extFile === ".html" ) {
        let fileName = path.basename(file, extFile);
        // console.log(fileName);

        app.get(`/${fileName}`, async (req, res) => {
            try {
                if (extFile === ".njk") {
                    res.render(fileName);
                }

                if (extFile === ".html") {
                    res.sendFile(filePath);
                }

                if (extFile === ".md") {
                    // Leyendo el archivo markdown para luego renderizarlo
                    let fileMDContent = await fs.readFile(filePath, {encoding: "utf-8"});

                    // Destructurando el archivo para pasarlo a la librería frontMatter
                    let {attributes: frontMatterAttributes, body} = fm(fileMDContent);

                    // Obteniendo los atributos o variables que almacenan los archivos markdown como variables
                    let attributes = frontMatterAttributes;

                    // Cargando y renderizando el contenido markdown a html para la página
                    let htmlContent = MarkdownIt().render(body);

                    // Renderizando la respuesta
                    res.render("layout-markdown", {...attributes, htmlContent});

                }
            } catch (error) {
                console.error(error);
                res.status(404).render("error404");
            }
        });
    }

}

//Ruta de la página principal
app.get("/", (req, res) => {
    res.render("index");
});

//Ruta del error 404
app.use((req, res) => {
    res.status(404).render("error404");
});

app.listen(PORT, () => {
    console.info(`Escuchando en el puerto ${PORT}`);
});