import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/style.scss";
import { roter } from "./roter/index.roter.js";

window.addEventListener("hashchange", (ev) => {
    roter(window.location.hash);
});