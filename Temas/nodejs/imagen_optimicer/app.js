// optimizando imágenes

import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from "sharp";




const procesarImagenes = () => {
    const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
    const inputPath = "originals";
    const outputPath = "optimiced";
    const ancho = 1920;

    fs.readdir(path.join(__dirname, inputPath), (error, files) => {
        if (error) {
            console.error(error);
            return
        } else {
            files.forEach((file) => {
                // console.log(file);
                sharp(path.join(__dirname, inputPath, file))
                .resize(ancho)
                .toFile(path.join(__dirname, outputPath, file), (error, info) => {
                    if (error) {
                        console.error(error);
                        return;
                    } else {
                        console.info(info);
                    }
                });
            });
        }
        return files;
    });

}

procesarImagenes();