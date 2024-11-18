const d = document,
    w = window;


export default function smartVideo() {
    const $videos = d.querySelectorAll("video[data-smart-video]");
    const callbackObservadora = (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.play();
            } else {
                entrada.target.pause();
            }

            w.addEventListener("visibilitychange", (e) => {
                if (d.visibilityState === "visible" && entrada.isIntersecting) {
                    entrada.target.play();
                } else {
                    entrada.target.pause();
                }
            });
        });
    }
    const observado = new IntersectionObserver(callbackObservadora, {
        threshold: 0.5,
    });
    $videos.forEach((obs) => {
        observado.observe(obs);
    });


}