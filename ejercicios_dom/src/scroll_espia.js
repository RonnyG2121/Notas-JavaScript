const d = document;


export default function scrollSpy() {
    const secciones = d.querySelectorAll("section [data-scroll-spy]");
    const callbackObservador = (entradas) => {
        //console.info("Ebtrada", entradas);
        entradas.forEach((entrada) => {
            //console.info(entradas);
            const id = entrada.target.getAttribute("id");
            if (entrada.isIntersecting) {
                d.querySelector(`a [data-scroll-spy] [href="#${id}"]`).classList.add("active");
            } else {
                d.querySelector(`a [data-scroll-spy] [href="#${id}"]`).classList.remove("active");
            }
        });
    }
    const observador = new IntersectionObserver(callbackObservador, {
        //root: ,
        //rootMargin: "300px",
        threshold: 0.5,
    });
    secciones.forEach((obs) => {
        observador.observe(obs);
    });

}