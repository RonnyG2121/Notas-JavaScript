import ob_api_wp from "../helpers/Wp_api.js";

export const Titulo = () => {
    const h1 = document.createElement("h1");
    h1.innerHTML = `  <a href="${ob_api_wp.dominio}" target="_blank" rel="noopener" >
    ${ob_api_wp.nombre.toUpperCase()}</a>`;

    return h1;
}