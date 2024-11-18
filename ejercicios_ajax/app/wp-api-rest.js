const d = document,
    w = window,
    sitios = d.getElementById("sites"),
    publicaciones = d.getElementById("posts"),
    loader = d.querySelector(".loader"),
    template = d.getElementById("post_template").content,
    fragmento = d.createDocumentFragment(),
    dominio = "https://nvda.es",
    jsonSite = `${dominio}/wp-json`,
    api_wp = `${jsonSite}/wp/v2`,
    postsInfo = `${api_wp}/posts?_embed`,
    pages = `${api_wp}/pages`,
    categories = `${api_wp}/categories`;

let page = 1,
    perPage = 10;


const getDataSitios = () => {
    fetch(jsonSite)

        .then((respuesta) => {
            return (respuesta.ok) ? respuesta.json() : Promise.reject(respuesta);
        })

        .then((respJson) => {
            console.info(respJson);
            sitios.innerHTML = `
            <h3>Sitio Web</h3>
            <h2>
              <a href="${respJson.url}" target="_blank">${respJson.name} </a>
            </h2>
            <p> ${respJson.description} </p>
            <p> ${respJson.timezone_string} </p>`;
        })

        .catch((err) => {
            console.error(err);
            let mensajeError = err.statusText || "Ocurrió un error";
            sitios.innerHTML = `<div> <b> Error ${err.status} ${mensajeError} </b> </div>`;
        });
}

const getPosts = () => {
    fetch(`${postsInfo}&page?${page}&per_page=${perPage}`)

        .then((respuesta) => {
            return (respuesta.ok) ? respuesta.json() : Promise.reject(respuesta);
        })

        .then((respJson) => {
            loader.style.visibility = "hidden";
            console.info(respJson);
            respJson.forEach((elemento) => {
                let listCategories = "",
                    listTags = "";

                elemento._embedded["wp:term"][0].forEach((elementoC) => {
                    listCategories += `<li>${elementoC.name} </li>`;
                });

                elemento._embedded["wp:term"][1].forEach((elementoT) => {
                    listTags += `<li>${elementoT.name} </li>`;
                });

                if (!elemento._embedded["wp:featuredmedia"]) {
                    template.querySelector(".post-image").src = "";
                    template.querySelector(".post-image").alt = "";
                } else {
                    template.querySelector(".post-image").src = elemento._embedded["wp:featuredmedia"][0].source_url;
                    template.querySelector(".post-image").alt = elemento.title.rendered;
                }

                template.querySelector(".post-title").innerHTML = elemento.title.rendered;

                if (elemento._embedded.author.avatar_urls) {
                    template.querySelector(".post-author").innerHTML = `
                    <img src="${elemento._embedded.author[0].avatar_urls["48"]}" alt="${elemento._embedded.author[0].name}" >
                    <figcaption> ${elemento._embedded.author[0].name} </figcaption>`;
                } else {
                    template.querySelector(".post-author").innerHTML = `
                    <div> Autor: <mark>${elemento.yoast_head_json.author}</mark></div>`;
                }

                template.querySelector(".post-date").innerHTML = new Date(elemento.date).toLocaleDateString();

                template.querySelector(".post-link").href = elemento.link;

                template.querySelector(".post-excerpt").innerHTML = elemento.excerpt.rendered.replace("[&hellip;]", "...");

                template.querySelector(".post-categories").innerHTML = `<p>Categorías:</p>
                <ul>${listCategories}</ul>`;

                template.querySelector(".post-tags").innerHTML = `<p>Etiquetas:</p>
                <ul>${listTags}</ul>`;

                template.querySelector(".post-content > article").innerHTML = elemento.content.rendered;



                let clon = d.importNode(template, true);
                fragmento.appendChild(clon);
                publicaciones.appendChild(fragmento);
            });

        })

        .catch((err) => {
            console.error(err);
            let mensajeError = err.statusText || "Ocurrió un error";
            publicaciones.innerHTML = `<div> <b> Error ${err.status} ${mensajeError} </b> </div>`;
            loader.style.visibility = "hidden";
        })

}


d.addEventListener("DOMContentLoaded", (ev) => {
    getDataSitios();
    getPosts();
});

w.addEventListener("scroll", (e) => {
    const { scrollTop, clientHeight, scrollHeight } = d.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
        console.log(scrollTop, clientHeight, scrollHeight);
        console.log("carga mas posts");
        template.querySelector("#btn_mas").addEventListener("click", (ev) => {
            page++;
            getPosts();
        });
        template.querySelector("#btn_mas").classList.remove("none");
    }
});


/*fetch("https://nvda.es/wp-json/wp/v2/posts")

    .then((respuesta) => {
        return (respuesta.ok) ? respuesta.json() : Promise.reject(respuesta);
    })

    .then((respJson) => {
        console.info(respJson);
    })*/