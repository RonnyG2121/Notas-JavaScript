export const Menu = () => {
    const navBar = document.createElement("nav");
    navBar.classList.add("menu");
    navBar.innerHTML = `
    <a href="#/inicio">Inicio</a>
    <span> - </span>
    <a href="#/search"> Búsqueda </a>
    <span> - </span>
    <a href="#/contacto" > Contacto </a>
    <span> - </span>
    <a href="http://aprendejavascript.org" target="_blank" rel="noopener"> Aprende JS </a>`;

    return navBar;
}