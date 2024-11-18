const d = document,
    sectionShow = d.getElementById("show_querys"),
    templateShow = d.getElementById("template_show").content,
    fragmento = d.createDocumentFragment();


d.addEventListener("keypress", async (ev) => {
    if (ev.target.matches("#id_search")) {
        if (ev.key === "Enter") {
        try {
                sectionShow.innerHTML = `
                    <img class="loader" src="files/loader.svg" alt="Cargando" role="alert">`;

                let query = ev.target.value.toLowerCase(),
                    url = `http://api.tvmaze.com/search/shows?q=${query}`,
                    respuesta = await fetch(url),
                    respJson = await respuesta.json();
                console.info(url, respuesta, respJson);

                if (!respuesta.ok) throw { status: respuesta.status, statusText: respuesta.statusText };

                if (respJson.length === 0) {
                    sectionShow.innerHTML = `<h2> No existen resultados de shows para el criterio de búsqueda : <mark>${query}</mark></h2>`;
                } else {
                    respJson.forEach((elemento) => {
                        templateShow.querySelector("h3").textContent = elemento.show.name;
                        templateShow.querySelector("div").innerHTML = elemento.show.summary || "Sin descripción";
                        templateShow.querySelector("img").src = elemento.show.image.medium || "No hay imagen disponible";
                        templateShow.querySelector("img").alt = elemento.show.name;
                        templateShow.querySelector("a").href = elemento.show.url || "#";
                        templateShow.querySelector("a").target = "_blank" || "_self";
                        templateShow.querySelector("a").textContent = "Ver más" || "";

                        let clon = d.importNode(templateShow, true);
                        fragmento.appendChild(clon);
                    });
                    sectionShow.innerHTML = "";
                    sectionShow.appendChild(fragmento);
                }
            } catch (error) {
                let mensajeError = error.statusText || "A ocurrido un error con la búsqueda";
                sectionShow.innerHTML = `
                <p><b>Error ${error.status} ${mensajeError}</b></p>`;
                console.error(error);
            }
        }
    }
});