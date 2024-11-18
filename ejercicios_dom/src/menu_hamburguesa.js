const d = document;
const btn = d.querySelector(".panel-btn");
const panel = d.querySelector(".panel");
const links = d.querySelectorAll(".menu a");

const hamburguesaMenu = () => {
    btn.addEventListener("click", (e) => {
        if (e.target.matches(".panel-btn") || e.target.matches(".panel-btn *")) {
            const expandida = btn.getAttribute("aria-expanded") === "true";
            btn.setAttribute("aria-expanded", !expandida);
            panel.classList.toggle("is-active");
            btn.classList.toggle("is-active");
            panel.setAttribute("aria-hidden", expandida);
        }
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            panel.classList.remove("is-active");  // Ocultar la navbar
            btn.setAttribute("aria-expanded", "false"); // Asegurarse de que el botón esté colapsado
            panel.setAttribute("aria-hidden", "true");  // Asegurarse de que el panel esté oculto en términos de accesibilidad
        });
    });

}


export { hamburguesaMenu };


/*function hamburguesa (selector_btn = "", selector_panel = "", menuLink="") {
    const btn = d.querySelector(selector_btn);
    const panel = d.querySelector(selector_panel);
    const link = document.querySelector(menuLink);
    btn.addEventListener("click", (e) => {
        if (e.target.matches(".panel-btn")) {
            const isExpanded = btn.getAttribute("aria-expanded") === "true";
            btn.setAttribute("aria-expanded", !isExpanded);
            panel.classList.toggle("is-active");
            panel.setAttribute("aria-hidden", isExpanded);
        }

        if (e.target.matches(link)) {
            btn.classList.remove("is-active");
            panel.classList.remove("is-active");
        }

    });

}
*/
//export default hamburguesa;
