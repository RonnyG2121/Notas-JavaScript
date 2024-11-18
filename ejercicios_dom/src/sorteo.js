const d = document;

export default function getSorteo(idBTN = "", selector = "") {
    const ganador = (selector) => {
        const participantes = d.querySelectorAll(selector);
        const random = Math.floor(Math.random() * participantes.length);
        const arrayGanador = participantes[random];
        return `El ganador del sorteo es: ${arrayGanador.textContent}`;
    }

    d.addEventListener("click", (e) => {
        if (e.target.matches(idBTN)) {
            let resultado = ganador(selector);
            alert(resultado);
            console.info(resultado);
        }
    });


}