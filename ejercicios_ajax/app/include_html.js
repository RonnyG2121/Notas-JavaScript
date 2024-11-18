const d = document;


d.addEventListener("DOMContentLoaded", (ev) => {
    const getInclude = (dataElement, url) => {
        const objetoAJAX = new XMLHttpRequest();
        objetoAJAX.addEventListener("readystatechange", (ev) => {
            if (objetoAJAX.readyState !== 4) {
                return;
            }
    
            if (objetoAJAX.status >= 200 && objetoAJAX.status < 300) {
                dataElement.outerHTML = objetoAJAX.responseText;
            } else {
                let mensajeError = objetoAJAX.statusText || "Error. Verifica la carga del archivo html";
                dataElement.outerHTML = `Error ${objetoAJAX.status} ${mensajeError}`;
            }
        });
    
        objetoAJAX.open("GET", url);
        objetoAJAX.setRequestHeader("Content-type", "text/html; charset=utf-8");
        objetoAJAX.send();
    }

    d.querySelectorAll("[data-include]").forEach((elemento) => {
        getInclude(elemento, elemento.getAttribute("data-include"));
    });
});