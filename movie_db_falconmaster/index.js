let page = 1;

const paginacion = () => {
    const btn_anterior = document.getElementById("btnAnterior"),
        btnSiguiente = document.getElementById("btn_siguiente");

    document.addEventListener("click", (ev) => {
        if (ev.target.matches("#btn_siguiente")) {
            if (page < 1000) {
                page++;
                downloadMovie();
            }
        } else if (ev.target.matches("#btn_anterior")) {
            if (page > 1) {
                page--;
                downloadMovie();
            }

        }

    });

}

const downloadMovie = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=96ec3d6caf53e5a63bff060f2c7eb364&language=es-MX&page=${page}`)
        .then((res) => {
            //console.log(res);
            return res.ok === true
                ? res.json()
                : Promise.reject(res);
        })
        .then((resJSON) => {
            let html = "";
            resJSON.results.forEach(pelicula => {
                html += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                        <p>${pelicula.overview}</p>
                    </div>
                `;
            });

            document.getElementById("contenedor").innerHTML = html;
            console.log(resJSON);
        })
        .catch((error) => {
            console.log(error);
        });
}

paginacion();
downloadMovie();