const d = document,
    principal = d.querySelector("main");


const getHTML = (opciones = {}) => {
    let {
        url = "",
        exito = (resp) => {},
        error = (err) => {},
    } = opciones;

    const objetoAJAX = new XMLHttpRequest();
    objetoAJAX.addEventListener("readystatechange", (ev) => {
        if (objetoAJAX.readyState !== 4) {
            return;
        }

        if (objetoAJAX.status >= 200 && objetoAJAX.status < 300) {
            const html = objetoAJAX.responseText;
            exito(html);
        } else {
            let mensajeError = objetoAJAX.statusText || "A ocurido un error";
            error(`Error ${objetoAJAX.status} ${mensajeError}`);
        }
    });

    objetoAJAX.open("GET", url);
    objetoAJAX.setRequestHeader("Content-type", "text/html; charset=utf-8");
    objetoAJAX.send();


}


d.addEventListener("DOMContentLoaded", (ev) => {
    getHTML({
        url: "files/inicio.html",
        exito: (html) => {
            principal.innerHTML = html;
        },
        error: (err) => {
            principal.innerHTML = `<h1>Error ${err}</h1>`;

        }
    })
});

d.addEventListener("click", (ev) => {
    if (ev.target.matches(".menu a")) {
        ev.preventDefault();
        getHTML({
            url: ev.target.href,
            exito: (html) => {
                principal.innerHTML = html;
            },
            error: (err) => {
                principal.innerHTML = `<h1>Error ${err}</h1>`;
            }
        });
        }
});