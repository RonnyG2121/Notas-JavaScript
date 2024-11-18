const d = document,
    regionPrincipal = d.querySelector("main");


fetch("files/javascript.md")
    .then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.text();
        } else {
            return Promise.reject(respuesta);
        }
    })

    .then((text) => {
        const convertToMarkDown = new showdown.Converter();
        let html = convertToMarkDown.makeHtml(text);
        regionPrincipal.innerHTML = `<div>${html}</div>`;
    })

    .catch((err) => {
        let mensajeError = err.statusText || "A ocurrido un error con el archivo markdown o con la solicitud";
        regionPrincipal.innerHTML = `<p><b>Error ${err.status} ${mensajeError}</b></p>`;
    });