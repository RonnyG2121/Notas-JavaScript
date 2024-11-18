const d = document;


export default function validaForms() {
    const formulario = d.querySelector(".form-contacto");
    const inputsRequeridos = d.querySelectorAll(".form-contacto [required]");
    //console.info(inputsRequeridos);
    inputsRequeridos.forEach((inp) => {
        const span = d.createElement("span");
        span.id = inp.name;
        span.textContent = inp.title;
        inp.insertAdjacentElement("afterend", span);
        span.classList.add("form-contacto-error", "none");
    });

    d.addEventListener("keyup", (e) => {
        const $input = e.target;
        let patrones = $input.pattern || $input.dataset.patron;

        if ($input.matches(".form-contacto [required]")) {
            //console.info($input, patrones);

            if (patrones) {
                //console.info("El input tiene patrónn")
                let re = new RegExp(patrones);
                return (!re.exec($input.value) && $input.value !== "")
                    ? (d.getElementById($input.name).classList.add("is-active"))
                    : (d.getElementById($input.name).classList.remove("is-active"));
            }

            if (!patrones) {
                //console.info("El input no tiene patrón");
                return ($input.value === "")
                    ? (d.getElementById($input.name).classList.add("is-active"))
                    : (d.getElementById($input.name).classList.remove("is-active"));

            }

        }
    });

    d.addEventListener("submit", (e) => {
        e.preventDefault();
        const objeto = e.target;
        const cargando = d.querySelector(".form-contacto-cargando");
        const respuesta = d.querySelector(".form-contacto-respuesta");
        //alert("Enviando el formulario");
        cargando.classList.remove("none");

        setTimeout(() => {
            cargando.classList.add("none");
            setTimeout(() => {
                respuesta.classList.remove("none");
            }, 3000);
        }, 3000);
        //respuesta.classList.add("none");
        formulario.reset();
    });

}