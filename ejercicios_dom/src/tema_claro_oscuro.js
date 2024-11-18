
const d = document;
export const btn_tema = d.querySelector(".btn-tema");
let bandera = false;
const cuerpo = d.body;
const raiz = d.html;
const local = localStorage;


const oscuroClaro = () => {
    bandera = !bandera;
    if (bandera) {
        local.setItem("tema", "true");
    } else {
        local.setItem("tema", "false");
    }

    if (local.getItem("tema") === "true") {
        cuerpo.classList.add("oscuro");
        btn_tema.textContent = "Cambiar a Tema claro ☀️";
    } else if (local.getItem("tema") === "false") {
        cuerpo.classList.remove("oscuro");
        btn_tema.textContent = "Cambiar al tema oscuro 🌙";
    }
}


btn_tema.addEventListener("click", oscuroClaro, false);