const d = document;
const w = window;


export default function responsiveTester(formID = "") {
    const form = d.getElementById(formID);
    let prueba;
    d.addEventListener("submit", (e) => {
        if (e.target === form) {
            e.preventDefault();
            prueba = window.open(form.direccion.value, "prueba", `innerWidth = ${form.ancho.value}, innerHeight = ${form.alto.value}`);
        }

        if (e.target === form.cerrar ) {
            prueba .close(form);
        }
    });


}