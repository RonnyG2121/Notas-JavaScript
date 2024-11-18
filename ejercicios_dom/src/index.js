import { hamburguesaMenu } from "./menu_hamburguesa.js";
import { btn_reloj, btn_alarma } from "./reloj_digital.js";
import contarHaciaAtras from "./cuenta_regresiva.js";
import { btn_scroll } from "./boton_scroll.js";
import { btn_tema } from "./tema_claro_oscuro.js";
import generateMediaResponsive from "./objeto_responsive.js";
import responsiveTester from "./responsive_test.js";
import deviceInfo from "./deteccion_dispositivos.js";
import { redStatus } from "./deteccion_red.js";
import webCam from "./deteccion_webcam.js";
import getLocation from "./geolocalizacion.js";
import Busqueda from "./filtro_busqueda.js";
import getSorteo from "./sorteo.js";
import slider from "./responsive_slider.js";
import smartVideo from "./video_inteligente.js";
import scrollSpy from "./scroll_espia.js";
import validaForms from "./validando_formularios.js";
import narradora from "./narrador.js";


const d = document;
narradora();

redStatus();

d.addEventListener("DOMContentLoaded", (e) => {
    hamburguesaMenu();
    contarHaciaAtras("cuenta_atras", "Jul 24, 2024 14:10:00", "¡Felicidades!");
    btn_tema;
    btn_scroll;
    generateMediaResponsive("video_youtube", "(min-width: 1024px)", `<a href="https://www.youtube.com/watch?v=ill_b1ESgOM&t=3s" target="_blank" rel="noopener"> Ver Video</a>`,
        `<iframe width="560" height="315" src="https://www.youtube.com/embed/ill_b1ESgOM?si=FmvNOwyZVgcdsv_J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
    generateMediaResponsive("mapa_google", "(min-width: 1024px)", "Contenido móvil", "Contenido escritorio");
    responsiveTester("test");
    deviceInfo("user_device")
    webCam("my_webcam");
    getLocation("location");
    Busqueda(".card-filter", ".card");
    getSorteo("#ganador-btn", ".player");
    slider();
    scrollSpy();
    //smartVideo();
    validaForms();
    

});