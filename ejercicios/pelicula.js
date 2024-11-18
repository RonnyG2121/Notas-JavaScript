class Pelicula {
    constructor(
        info = {
            id: "",
            titulo: "",
            director: "",
            anioDeEstreno: undefined,
            paisPaises: [],
            generos: [],
            calificacion: 0
        }) {
        this.id = info.id;
        this.titulo = info.titulo;
        this.director = info.director;
        this.anioDeEstreno = info.anioDeEstreno;
        this.paisPaises = info.paisPaises;
        this.generos = info.generos;
        this.calificacion = info.calificacion;
        this.validaID(this.id);
        this.validaTitulo(this.titulo);
        this.validaDirector(this.director);
        this.validaAnio(this.anioDeEstreno);
        this.validarPais(this.paisPaises);
        this.validarGeneros(this.generos);
        this.validaCalificacion(this.calificacion);
    }

    validaNumero(propiedad = "", valor = undefined) {
        if (valor === null || valor === undefined || valor === "") {
            console.error(`La propiedad ${propiedad}, no tiene ningún valor`);
        }
        else if (typeof valor !== "number") {
            console.error(`El valor ${valor}, no es un número`)
        }
    }

    validaArreglos(propiedad = "", valor = []) {
        let contador = [];
        if (valor.length === 0) {
            console.error(`la propiedad ${propiedad}, no tiene ningún valor`);
        }
        else if (!Array.isArray(valor)) {
            console.error(`El valor ${valor}, no es una lista`);
        }
        for (let i of valor) {
            if (typeof i !== "string") {
                contador.push(i);
            }
        }
        if (contador.length > 0) {
            console.warn(`La propiedad ${propiedad}, contiene  valores  (${contador.length}) que no son  texto. ${contador.join(", ")}`);
        }
    }

    validaCadena(propiedad = "", valor = "") {
        if (valor === null || valor === "" || valor === undefined) {
            console.error(`La propiedad ${propiedad}, no tiene ningún valor`);
        }
        else if (typeof valor !== "string") {
            console.warn(`el valor ${valor} no es un texto`);
        }
        return true;
    }

    validarLongitudCadena(propiedad = "", valor = "", longitud = 0) {
        if (valor > longitud) {
            console.error(`el campo ${propiedad} excede el número de carácteres permitidos. solo se permiten ${longitud} carácteres como máximo`);
        }
    }

    validaID(id = "") {
        let re = /^([a-zA-Z]{2})([0-9]{7})$/gi
        if (this.validaCadena("ID", id)) {
            return false;
        }
        if (!re.test(id)) {
            console.error(`El Id ${id} no es válido. solo se aceptan 2 letras al principio y 7 números después`);
        }
        return true;
    }

    validaTitulo(titulo = "") {
        if (this.validaCadena("Título", titulo)) {
            return false;
        }
        if (this.validarLongitudCadena("Título", titulo, 100)) {
            return false;
        }
        return true;
    }

    validaDirector(director = "") {
        if (this.validaCadena("Director", director)) {
            return false;
        }
        if (this.validarLongitudCadena("Director", director, 50)) {
            return false;
        }
        return true;
    }

    validaAnio(anio = "") {
        let re = /^([0-9]{4})$/gi
        if (this.validaNumero("Año de estreno", anio)) {
            return false;
        }
        if (!re.test(anio)) {
            console.error(`El año ${anio} no es válido. solo se acepta un número de 4 dígitos`);
        }
        return true;
    }

    validarPais(pais = []) {
        if (this.validaArreglos("País", pais)) {
            return false;
        }
        return true;
    }

    validarGeneros(generos = []) {
        if (this.validaArreglos("Género", generos)) {
            return false;
        }
        for (let g of generos) {
            if (!Pelicula.listaGeneros.includes(g)) {
                console.error(`Existen géneros incorrectos y no permitidos ${g}`);
            }
        }
        return true;
    }

    static get listaGeneros() {
        return [
            "Action", "Adult", "Adventure", "Animation", "Biography", "Comedy",
            "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film Noir",
            "Game-Show", "History", "Horror", "Musical", "Music", "Mystery",
            "News", "Reality-TV", "Romance", "Sci-Fi", "Short", "Sport",
            "Talk-Show", "Thriller", "War", "Western"]
    }

    static generosAceptados() {
        return `Los géneros aceptados son: ${Pelicula.listaGeneros.join(", ")}`;
    }

    validaCalificacion(calificacion =0) {
        //let re = /^([0-9]{4})$/gi
        if (this.validaNumero("calificación", calificacion)) {
            return false;
            if (calificacion < 0 && calificacin > 10) {
                console.error(` La calificación ${calificacion} no es válida. solo se acepta un número entr 0 y 10`);
            }
        }
        return true;
    }

}

const peli = new Pelicula({
    id: "tt1234567",
    titulo: "La pelicula",
    director: "RRR",
    anioDeEstreno: 2020,
    paisPaises: ["RRD"],
    generos: ["Comedy", "Crime"],
    calificacion: 10.0
});
console.log(peli);