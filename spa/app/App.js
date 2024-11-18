import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Loader } from "./components/Loader.js"
import { Router } from "./components/Router.js";
import { ScrollInfinito } from "./helpers/Scroll_infinito.js";

export const App = () => {
    const mainRoot = document.getElementById("id_root");
    mainRoot.innerHTML = null;

    mainRoot.appendChild(Header());
    mainRoot.appendChild(Main());
    mainRoot.appendChild(Loader());
    Router();
    ScrollInfinito();

}