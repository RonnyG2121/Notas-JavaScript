import { Titulo } from "./Titulo.js";
import { Menu } from "./Menu.js";
import { SearchForm } from "./Search_form.js";

export const Header = () => {
    const cabecera = document.createElement("header");
    cabecera.classList.add("header");
    cabecera.appendChild(Titulo());
    cabecera.appendChild(Menu());
    cabecera.appendChild(SearchForm());

    return cabecera;
}