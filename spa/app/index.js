import Wp_api from "./helpers/Wp_api.js";
import { App } from "./App.js";


document.addEventListener("DOMContentLoaded", (ev) => {
    App();
});

window.addEventListener("hashchange", (ev) => {
    Wp_api.page = 1;
    App();
});