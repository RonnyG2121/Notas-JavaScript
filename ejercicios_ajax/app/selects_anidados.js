const d = document,
    provincias = d.getElementById("id_provincia"),
    municipios = d.getElementById("id_municipio"),
    sectores = d.getElementById("id_sector");


const cargaProvincias = () => {
    fetch("https://api.digital.gob.do/v1/territories/provinces")

        .then((respuesta) => {
            //console.info(respuesta);
            return (respuesta.ok) ? respuesta.json() : Promise.reject(respuesta);
        })

        .then((respJson) => {
            //console.info(respJson);

            respJson.data.forEach((elemento) => {
                let opciones = d.createElement("option");
                opciones.value = elemento.name;
                opciones.text = elemento.name;
                opciones.setAttribute("data-provinceCode", elemento.code);
                provincias.add(opciones);
            });

        })

        .catch((err) => {
            let mensajeError = err.statusText || "Ocurrió un error";
            provincias.nextElementSibling.innerHTML = `Error ${err.status} ${mensajeError}`;
            console.error(err);
        });
}



const cargaMunicipio = (provincia) => {
    fetch(`https://api.digital.gob.do/v1/territories/municipalities?provinceCode=${provincia}`)
        .then((respuesta) => {
            return respuesta.ok ? respuesta.json() : Promise.reject(respuesta);
        })
        .then((respJson) => {
            if (typeof respJson.data === 'object') {
                if (Array.isArray(respJson.data)) {
                    // Si es un arreglo de municipios
                    respJson.data.forEach((municipio) => {
                        let opciones = d.createElement("option");
                        opciones.value = municipio.name;
                        opciones.text = municipio.name;
                        municipios.add(opciones);
                    });
                } else {
                    // Si es un solo municipio
                    let opciones = d.createElement("option");
                    opciones.value = respJson.data.name;
                    opciones.text = respJson.data.name;
                    municipios.add(opciones);
                }
            } else {
                console.error("La respuesta de la API no contiene datos de municipios válidos:", respJson);
            }
        })

        .catch((err) => {
            let mensajeError = err.statusText || "Ocurrió un error";
            municipios.nextElementSibling.innerHTML = `Error ${err.status} ${mensajeError}`;
            console.error(err);
        });
}


const cargaSector = (municipio) => {

}

d.addEventListener("DOMContentLoaded", cargaProvincias);

provincias.addEventListener("change", (ev) => {
    const selectedOption = ev.target.options[ev.target.selectedIndex];
    const provinceCode = selectedOption.getAttribute("data-provinceCode");
    //console.info(provinceCode);
    limpiar(municipios);
    limpiar(sectores);

    cargaMunicipio(provinceCode);
});

sectores.addEventListener("change", (ev) => {
    cargaSector(ev.target.value);
});

const limpiar = (select) => {
    while (select.options.length > 1) {
        select.remove(1);
    }
}
