const d = document,
    principal = d.querySelector("main"),
    selectArchivos = d.getElementById("id_archivos"),
    zonaDrop = d.querySelector(".zona-drop");


const subirArchivos = (archivos) => {
    //console.log(archivo);

    const objetoAjax = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("archivos", archivos);

    objetoAjax.addEventListener("readystatechange", (ev) => {
        if (objetoAjax.readyState !== 4) {
            return;
        }

        if (objetoAjax.status >= 200 && objetoAjax.status < 300) {
            let myJson = JSON.parse(objetoAjax.responseText);
            console.info(myJson);
        } else {
            let mensajeError = objetoAjax.statusText || "Ocurrió un error";
            console.error(`Error ${objetoAjax.status} ${mensajeError}`);
        }
    });

    objetoAjax.open("POST", "logica/uploader.php");
    objetoAjax.setRequestHeader("encoding-type", "multipart/form-data");
    objetoAjax.send(formData);
}

const barraProgreso = (archivo) => {
    const progreso = d.createElement("progress");
    const span = d.createElement("span");
    progreso.value = 0;
    progreso.max = 100;
    principal.insertAdjacentElement("beforeend", progreso);
    principal.insertAdjacentElement("beforeend", span);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(archivo);
    fileReader.addEventListener("progress", (ev) => {
        let progresoTotal = parseInt((ev.loaded * 100) / ev.total);
        progreso.value = progresoTotal;
        span.innerHTML = `<b>${archivo.name} - Progreso: ${progresoTotal}%</b>`;
    });

    fileReader.addEventListener("loadend", (ev) => {
        subirArchivos(archivo);

        setTimeout(() => {
            principal.removeChild(progreso);
            principal.removeChild(span);
            selectArchivos.value = "";
        }, 5000);
    });
    }

d.addEventListener("change", (ev) => {
    if (ev.target === selectArchivos) {
        //console.log(ev.target.files);
        const subido = Array.from(ev.target.files);
        subido.forEach((elemento) => {
            barraProgreso(elemento);
        });
    }
});


zonaDrop.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.classList.add("is-active");
});

zonaDrop.addEventListener("dragleave", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.classList.remove("is-active");
});

zonaDrop.addEventListener("drop", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const archivos = Array.from(ev.dataTransfer.files);
    archivos.forEach((elemento) => {
        barraProgreso(elemento);
        ev.classList.remove("is-active");
    });
});