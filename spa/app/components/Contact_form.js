export const ContactForm = () => {
    const d = document,
        formulario = d.createElement("form"),
        estilos = d.getElementById("dinamic_style");

    estilos.innerHTML = `
    /* Estilos para el formulario */
html {
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 16px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}


.form-contacto {
  --form-ok-color: #4caf50;
  --form-error-color: #f44336;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

.form-contacto * {
  padding: 0.5rem;
  margin: 1rem auto;
  display: block;
  width: 100%;
}

.form-contacto textarea {
  resize: none;
}

.form-contacto legend,
.form-contacto-respuesta {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.form-contacto label,
.form-contacto input,
.form-contacto textarea {
  font-size: 1rem;
  font-family: sans-serif;
}

.form-contacto input[type="submit"] {
  width: 50%;
  font-weight: bold;
  cursor: pointer;
}

.form-contacto *::placeholder {
  color: #000;
}

.form-contacto[required]:valid {
  border: thick solid var(--form-ok-color);
}

.form-contacto[required]:invalid {
  border: thick solid var(--form-error-color);
}

.form-contacto-error {
  margin-top: -1rem;
  font-size: 80%;
  background-color: var(--form-error-color);
  color: #fff;
  transition: all 800ms ease;
}

.form-contacto-error.is-active {
  display: block;
  animation: show-message 1s 1 normal 0s ease-out both;
}

.none {
  display: none;
}

@keyframes show-message {
  0% {
    visibility: hidden;
    opacity: 0;
  }

  100% {
    visibility: visible;
    opacity: 1;
  }
}`;
    formulario.classList.add("form-contacto")

    formulario.innerHTML = `
    <legend>Contáctanos aquí</legend>

    <label for="id_nombre">Nombre</label>
    <input type="text" name="nombre" id="id_nombre" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$"
        placeholder="Nombre" title="Este campo es requerido" required>
        <label for="id_correo">Correo Electrónico</label>
    <input type="email" name="correo" id="id_correo" placeholder="Correo electrónico" title="Este campo es requerido"
        pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z])$" required>
        <label for="id_asunto">Asunto</label>
    <input type="text" name="asunto" id="id_asunto" placeholder="Asunto" title="Este campo es requerido" required>
    <label for="id_comentario">Comentario</label>
    <textarea data-patron="^.{1,500}$" name="comentario" id="id_comentario" cols="50" rows="5" placeholder="Comentario"
        title="Máximo 500 caracteres. Este campo es requerido" required></textarea>
    <input type="submit" id="id_enviar" value="enviar">
    <div class="form-contacto-cargando none" role="alert">
        <img src="app/assets/loader.svg" alt="Cargando...">
    </div>

    <div class="form-contacto-respuesta none" role="alert">
    </div>`;

    const validaForms = () => {
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
                    //console.info(json);
                    cargando.classList.add("none");
                    respuesta.classList.remove("none");
                    respuesta.innerHTML = `<p> ${json.message} </p>`;
                    formulario.reset();
                })
                .catch((err) => {
                    let mensajeError = err.statusText || "Ocurrió un error al enviar el mensaje. intenta nuevamente";
                    //console.error(err);
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

    setTimeout(() => {
        validaForms();
    }, 100);
    return formulario;
}