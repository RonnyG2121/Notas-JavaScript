//Creando un CRUD con AJAX
const d = document,
    tabla = d.querySelector(".crud-table"),
    formulario = d.querySelector(".form-crud"),
    titulo = d.querySelector(".titulo-crud"),
    template = d.getElementById("crud_template").content,
    fragmento = d.createDocumentFragment();

//Usando AJAX
const ajax = (opciones = {}) => {
    let {
        method = "",
        url = "",
        success = (respuesta) => {},
        error = (err) => { },
        data = {}
} = opciones;
    const XHR = new XMLHttpRequest();
    XHR.addEventListener("readystatechange", (ev) => {
        if (XHR.readyState !== 4) {
            return;
        }

        if (XHR.status >= 200 && XHR.status < 300) {
            let myJson = JSON.parse(XHR.responseText);
            success(myJson);
        } else {
            let mensajeError = XHR.statusText || "A ocurrido un error con la aplicación";
            error(`Error ${XHR.status} ${mensajeError}`);
        }
    });
    XHR.open(method || "GET", url);
    XHR.setRequestHeader("Content-type", "application/json; charset=utf-8");
    XHR.send(JSON.stringify(data));
}

const getAllFruits = () => {
    ajax({
        method: "GET",
        url: "http://localhost:8000/frutas",
        success: (respuesta) => {
            console.log(respuesta);
            respuesta.forEach((elemento) => {
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

        },

        error: (err) => {
            console.log(err);
            tabla.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        }
    });
}

d.addEventListener("DOMContentLoaded", getAllFruits);

d.addEventListener("submit", (ev) => {
    if (ev.target === formulario) {
        ev.preventDefault();
        if (!ev.target.id.value) {
            //Esto ejecutará el post o creará una nueva fruta, por así decirlo
            ajax({
                method: "POST",
                url: "http://localhost:8000/frutas",
                success: (respuesta) => {
                    location.reload();
                },
                error: (err) => {
                    formulario.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
                },
                data: {
                    id: ev.target.id.value,
                    nombre: ev.target.nombre.value,
                    precio: ev.target.precio.value
                }
            });
        } else {
            //Actualizando una fruta ya existente
            ajax({
                method: "PUT",
                url: `http://localhost:8000/frutas/${ev.target.id.value}`,
                success: (respuesta) => {
                    location.reload();
                },
                error: (err) => {
                    formulario.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
                },
                data: {
                    id: ev.target.id.value,
                    nombre: ev.target.nombre.value,
                    precio: ev.target.precio.value
                }
            });

        }

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
            ajax({
                method: "DELETE",
                url: `http://localhost:8000/frutas/${ev.target.dataset.id}`,
                success: (respuesta) => {
                    location.reload();
                },
                error: (err) => {
                    formulario.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
                }
            });
        }
    }
});

