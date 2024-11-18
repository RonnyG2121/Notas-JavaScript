const d = document;

const comandoTeclas = (evento) => {
    console.log(evento);
}

d.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "a" ) {
        alert(`Hola. Precionaste la tecla ${e.key}`);
    }
        comandoTeclas(e);
}, false);