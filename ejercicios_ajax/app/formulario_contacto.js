const d = document;


function validaForms() {
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
        const input = e.target;
        let patrones = input.pattern || input.dataset.patron;

        if (input.matches(".form-contacto [required]")) {
            //console.info(input, patrones);

            if (patrones) {
                //console.info("El input tiene patrónn")
                let re = new RegExp(patrones);
                return (!re.exec(input.value) && input.value !== "")
                    ? (d.getElementById(input.name).classList.add("is-active"))
                    : (d.getElementById(input.name).classList.remove("is-active"));
            }

            if (!patrones) {
                //console.info("El input no tiene patrón");
                return (input.value === "")
                    ? (d.getElementById(input.name).classList.add("is-active"))
                    : (d.getElementById(input.name).classList.remove("is-active"));

            }

        }
    });

    d.addEventListener("submit", (e) => {
        e.preventDefault();
        const cargando = d.querySelector(".form-contacto-cargando");
        const respuesta = d.querySelector(".form-contacto-respuesta");
        cargando.classList.remove("none");

        fetch("https://formsubmit.co/ajax/omnierfox@gmail.com", {
            method: "POST",
            body: new FormData(e.target)
        })
            .then((res) => {
                return (res.ok)
                    ? res.json()
                    : Promise.reject(res);
            })
            .then((json) => {
                console.info(json);
                cargando.classList.add("none");
                respuesta.classList.remove("none");
                respuesta.innerHTML = `<p> ${json.message} </p>`;
                formulario.reset();
            })
            .catch((err) => {
                let mensajeError = err.statusText || "Ocurrió un error al enviar el mensaje. intenta nuevamente";
                console.error(err);
                respuesta.innerHTML = `<p>Error  ${err.status}  ${mensajeError}</p>`;
            })
            .finally(() => {
                setTimeout(() => {
                    respuesta.classList.add("none");
                    respuesta.innerHTML = "";
                }, 5000);
            });

    });

}

d.addEventListener("DOMContentLoaded", (ev) => {
    validaForms();
});