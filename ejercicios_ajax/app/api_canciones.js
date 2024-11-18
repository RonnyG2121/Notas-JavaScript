const d = document,
    formulario = d.getElementById("sound_search"),
    loader = d.querySelector(".loader"),
    asideError = d.querySelector(".error"),
    regionPrincipal = d.querySelector("main"),
    articuloArtista = d.querySelector(".artist"),
    articuloCancion = d.querySelector(".sound");


formulario.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    try {
        loader.style.display = "block";
        let inputArtista = ev.target.artista.value.toLowerCase(),
            inputCancion = ev.target.cancion.value.toLowerCase(),
            templateArtista = "",
            templateCancion = "",
            apiArtista = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${inputArtista}`,
            apiCancion = `https://api.lyrics.ovh/v1/${inputArtista}/${inputCancion}`,
            fetchArtista = fetch(apiArtista),
            fetchCancion = fetch(apiCancion),

            [respuestaArtista, respuestaCancion] = await Promise.all([fetchArtista, fetchCancion]),

            jsonArtista = await respuestaArtista.json(),
            jsonCancion = await respuestaCancion.json();

        console.info(jsonArtista, jsonCancion);
    } catch (error) {
        let mensajeError = error.statusText || "Ocurrió un error";
        regionPrincipal.innerHTML = `
        <p>Error ${error.status} ${mensajeError}</p>`;
        loader.style.display = "none";
        console.error(error);
    }
});