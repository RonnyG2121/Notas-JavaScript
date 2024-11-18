
const btn_reloj = document.getElementById("reloj"),
    div_pantalla = document.getElementById("pantalla_reloj"),
    btn_alarma = document.getElementById("alarma"),
    input_alarma = document.getElementById("valor_ms");
let id_alarma = null;
let bandera = false;
let reloj = null;
let sonido = document.createElement("audio");
sonido.src = "sounds/ALARMA CLOCK.mp3";

const fechaYHora = () => {
    const fecha = new Date();
    const hoy = fecha.getDate();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const dia = fecha.getDay();
    let meses = fecha.getMonth();
    const anio = fecha.getFullYear();
    let fechaFormato = div_pantalla.textContent = `Son las ${hora} y ${minutos} Minutos. (${hoy}/${meses + 1}/${anio})`;
    return fechaFormato;
}


btn_reloj.addEventListener("click", (e) => {
    if (!bandera) {
        reloj = setInterval(fechaYHora, 1000);
        btn_reloj.textContent = "Desactivar reloj";
    }
    else {
        clearInterval(reloj);
        div_pantalla.textContent = "";
        btn_reloj.textContent = "Iniciar Reloj";
    }
    bandera = !bandera;
}, false);


btn_alarma.addEventListener("click", (e) => {
    bandera = !bandera;
    if (bandera) {
        id_alarma = setTimeout(() => {
            sonido.play();
        }, input_alarma.value);
        btn_alarma.textContent = "Detener Alarma";
    }
    else {
        id_alarma = setTimeout(() => {
            sonido.pause();
            sonido.currentTime = 0;
        }, 0);
        btn_alarma.textContent = "Iniciar Alarma";
    }
}, false);


export { btn_reloj };
export { btn_alarma };