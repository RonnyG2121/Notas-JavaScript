const d = document;

const contarHaciaAtras = (id, tiempo_limite, msgFinal) => {
    const infoID = d.getElementById(id);
    const limite = new Date(tiempo_limite).getTime();
    let intervalo = setInterval(() => {
        const ahora = new Date().getTime();
        let futuro = limite - ahora;
        if (futuro <= 0) {
            clearInterval(intervalo);
            infoID.textContent = `¡Hoy es el día! ${msgFinal}`;
            return;
        }

        let days = Math.floor(futuro / (1000 * 60 * 60 * 24));
        let hours = ("0" + Math.floor((futuro % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
        let minutes = ("0" + Math.floor((futuro % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
        let seconds = ("0" + Math.floor((futuro % (1000 * 60)) / (1000))).slice(-2);

        infoID.textContent = `Faltan ${days} días, ${hours} Horas, ${minutes} Minutos y ${seconds} Segundos para el ${tiempo_limite}`;
        return infoID;

    }, 1000);


}


export default contarHaciaAtras;
// contarHaciaAtras(selector, "Nov 12, 2024 12:00:00");


