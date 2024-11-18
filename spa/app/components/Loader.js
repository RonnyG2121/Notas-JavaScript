export const Loader = () => {
    const cargador = document.createElement("div");
    cargador.classList.add("loader");
    cargador.role = "alert";
    cargador.innerHTML = `
    <img src="app/assets/loader.svg" alt="Imagen">
    Cargando...`;

    return cargador;
}