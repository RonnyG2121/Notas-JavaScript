const d = document;
const w = window;

// Declaro un limite de cuando se va a mostrar el boton
const showButtonLimit = 500;
// De una vez identifico que clase quiero capturar con el querySelector
export const btn_scroll = d.querySelector(".scroll-top-btn");


const scrollContainer = () => {
  return document.documentElement || document.body;
}

//De esta forma no tienes que exportar la función, siempre se invocara cuando
//se haga escroll

d.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showButtonLimit) {
    btn_scroll.classList.remove("hidden");
  } else {
    btn_scroll.classList.add("hidden");
  }
});

//La función que llamará el botón para volver al inicio.
const goTop = () => {
  d.body.scrollIntoView({
    behavior: "smooth",
  });
  const enlace = d.getElementById("logo");
  enlace.focus();
}

//Capturamos el evento click del boton
btn_scroll.addEventListener("click", goTop);



/*const d = document;
const w = window;

export const scroll = (selector = "") => {
    const btn_scroll = d.querySelector(selector);

    w.addEventListener("scroll", (e) => {
        let scrollTop = w.pageYOffset || d.documentElement.scrollTop;
        if (scrollTop > 10) {
            btn_scroll.classList.remove("hidden");
        } else {
            btn_scroll.classList.add("hidden");
        }
    });

    btn_scroll.addEventListener("click", (e) => {
        if (e.target.matches(selector) || e.target.matches(`${selector}`)) {
            w.scrollTo ({
                behavior: "smooth",
                top: 0,});

        }
    });

}


//Aquí es donde va el módulo donde lo exporto y lo estoy cargando
/*d.addEventListener("DOMContentLoaded", (e) => {
    scroll(".scroll-top-btn");
});*/