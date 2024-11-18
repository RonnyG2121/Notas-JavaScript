export const Ajax = async (propiedades) => {
    let {
        url,
        exito
    } = propiedades;
    await fetch(url)

        .then((respuesta) => {
            return (respuesta.ok) ? respuesta.json() : Promise.reject(respuesta);
        })

        .then((respJson) => {
            return exito(respJson);
        })

        .catch((err) => {
            let mensajeError = err.statusText || "A ocurrido un error con la petición";
            document.getElementById("id_main").innerHTML = `
            <div class="error">
            <p>Error ${err.status} ${mensajeError}</p>
            </div>`;
            document.querySelector(".loader").style.display = "none";

            console.error(err);
        });
}