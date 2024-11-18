import express from "express";
import path from "path";
import { router } from "./routes/payments.routes.js";
import {port} from "./config.js";


const app = express();
app.use(express.json());
app.use(router);
app.use(express.static(path.resolve("src/public")));

app.listen(port, () => {
    console.info(`Puerto establecido: ${port}`);

});

