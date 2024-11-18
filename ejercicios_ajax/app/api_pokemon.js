const d = document,
    regionPrincipal = d.querySelector("main"),
    navLinks = d.querySelector(".links");



const cargaPokemons = async (url) => {
    let template = "",
        enlacePrev = "",
        enlaceNext = "";

    try {
        let respuesta = await fetch(url),
            resJson = await respuesta.json();
        console.info(resJson);

        if (!respuesta.ok) {
            throw {
                status: respuesta.status,
                statusText: respuesta.statusText,
            };
        } else {
            for (let i = 0; i < resJson.results.length; i++) {
                //console.info(json.results[i]);

                try {
                    let respuesta2 = await fetch(resJson.results[i].url),
                        pokemon = await respuesta2.json();
                    //console.info(pokemon);

                    if (!respuesta2.ok) {
                        throw { status: respuesta2.status, statusText: respuesta2.statusText };
                    } else {
                        template += `<figure>
                        <img alt=${pokemon.name} src=${pokemon.sprites.front_default}>
                        <figcaption>
                        ${pokemon.name}
                        </figcaption>
                        </figure>`;

                    }
                } catch (error) {
                    console.error(error)
                }

            }
            regionPrincipal.innerHTML = template;

            let contador = 1;
            (resJson.previous)
                ? enlacePrev += `
                <a href=${resJson.previous}>Atrás</a>`
                : enlacePrev = "";

            (resJson.next)
                ? enlaceNext += `
                <a href=${resJson.next}>Siguiente</a>`
                : enlaceNext = "";

            navLinks.innerHTML = `${enlacePrev}
            ${enlaceNext}`;

        }

    } catch (error) {
        console.error(error);
    }
}

d.addEventListener("click", (ev) => {
    if (ev.target.matches("nav a")) {
        ev.preventDefault();
        cargaPokemons(ev.target.getAttribute("href"));
    }
});

d.addEventListener("DOMContentLoaded", (ev) => {
    regionPrincipal.innerHTML = `<div role="alert">
    <img class="loader" alt="Cargando..." src="files/loader.svg">
    Cargando...</div>`;
    cargaPokemons("https://pokeapi.co/api/v2/pokemon/");
});