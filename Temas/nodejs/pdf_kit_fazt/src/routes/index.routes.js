import { Router } from "express";
import { givePDF } from "../libs/pdf_kit.js";

export const router = Router();

router.get("/pdf", (req, res) => {
    const stream = res.writeHead(200,
        {
            "content-Type": "application/pdf",
            "content-disposition": "attachment; filename=hola.pdf",
        });
    givePDF((data) => {
        return stream.write(data);
    },
    () => {
        return stream.end();
    });

});
