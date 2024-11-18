//Creando un CRUD usando la api de axios
const d = document,
    tabla = d.querySelector(".crud-table"),
    formulario = d.querySelector(".form-crud"),
    titulo = d.querySelector(".titulo-crud"),
    template = d.getElementById("crud_template").content,
    fragmento = d.createDocumentFragment();


const getAllFruits = () => {
    axios.get("http://localhost:8000/frutas")
        .then((respuesta) => {
            let respuestaJSON = respuesta.data;
            respuestaJSON.forEach((elemento) => {
                template.querySelector(".datos-nombre").textContent = elemento.nombre;
                template.querySelector(".datos-precio").textContent = elemento.precio;
                template.querySelector(".btn-editar").dataset.id = elemento.id;
                template.querySelector(".btn-editar").dataset.nombre = elemento.nombre;
                template.querySelector(".btn-editar").dataset.precio = elemento.precio;
                template.querySelector(".btn-editar").textContent = `Editar ${elemento.nombre}`;
                template.querySelector(".btn-eliminar").dataset.id = elemento.id;
                template.querySelector(".btn-eliminar").dataset.nombre = elemento.nombre;
                template.querySelector(".btn-eliminar").textContent = `Eliminar ${elemento.nombre}`;

                let clon = d.importNode(template, true);
                fragmento.appendChild(clon);

            });
            tabla.querySelector("tbody").appendChild(fragmento);
            console.log(respuestaJSON);
        })
        .catch((err) => {
            let mensajeError = err.response.statusText || "A ocurrido un error";
            tabla.insertAdjacentHTML("afterend", `<p><b>Error ${err.response.status} ${mensajeError}</b></p>`);
            console.log(err);
        });
}


d.addEventListener("DOMContentLoaded", getAllFruits);

d.addEventListener("submit", (ev) => {
    if (ev.target === formulario) {
        ev.preventDefault();
    }

    if (!ev.target.id.value) {
        let opciones = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            data: JSON.stringify({
                id: ev.target.id.value,
                nombre: ev.target.nombre.value,
                precio: ev.target.precio.value
            })
        }

        axios("http://localhost:8000/frutas", opciones)
            .then((frespuesta) => {
                return frespuesta.data;
            })
            .then((respuestaJSON) => {
                location.reload();
            })
            .catch((err) => {
                let mensajeError = err.statusText || "Ocurrió un error";
                formulario.insertAdjacentHTML("afterend", `<p><b>Error ${err.status} ${mensajeError}</b></p>`);
            });
    } else {
        let opciones = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            data: JSON.stringify({
                id: ev.target.id.value,
                nombre: ev.target.nombre.value,
                precio: ev.target.precio.value
            })
        }

        axios(`http://localhost:8000/frutas/${ev.target.id.value}`, opciones)
            .then((frespuesta) => {
                return respuesta.data;
            })
            .then((respuestaJSON) => {
                location.reload();
            })
            .catch((err) => {
                let mensajeError = err.response.statusText || "Ocurrió un error";
                formulario.insertAdjacentHTML("afterend", `<p><b>Error ${err.response.status} ${mensajeError}</b></p>`);
            });
    }

});


d.addEventListener("click", (ev) => {
    if (ev.target.matches(".btn-editar")) {
        titulo.textContent = "Editar fruta";
        formulario.id.value = ev.target.dataset.id;
        formulario.nombre.value = ev.target.dataset.nombre;
        formulario.precio.value = ev.target.dataset.precio;
        formulario.nombre.focus();
    }

    if (ev.target.matches(".btn-eliminar")) {
        let isDelete = confirm(`¿Desea eliminar el id ${ev.target.dataset.id} de la fruta ${ev.target.dataset.nombre}?`);
        if (isDelete) {
            let opciones = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            }
            axios(`http://localhost:8000/frutas/${ev.target.dataset.id}`, opciones)
                .then((respuesta) => {
                    location.reload();
                })
                .catch((err) => {
                    let mensajeError = err.response.statusText || "Ocurrió un error";
                    formulario.insertAdjacentHTML("afterend", `<p><b>Error ${err.response.status} ${mensajeError}</b></p>`);
                });
        }

    }
    });