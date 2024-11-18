const d = document;

export default function slider() {
    const previo = d.querySelector(".prev"),
        siguiente = d.querySelector(".next"),
        deslizador = d.querySelectorAll(".slider-slide");

    let contador = 0;
    d.addEventListener("click", (e) => {
        if (e.target === previo) {
            e.preventDefault();
            deslizador [contador].classList.remove("active");
            contador--;
        }
        if (contador < 0) {
            contador = deslizador.length - 1;
        }
        deslizador [contador].classList.add("active");

        if (e.target === siguiente) {
            e.preventDefault();
            deslizador [contador].classList.remove("active");
            contador++;
        }
        if (contador >= deslizador.length) {
            contador = 0;
        }
        deslizador [contador].classList.add("active");


    });

}