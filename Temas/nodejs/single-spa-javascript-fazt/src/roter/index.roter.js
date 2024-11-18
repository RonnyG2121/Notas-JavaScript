import { pages } from "../controllers/index.controllers.js";

export const roter = async (path) => {
    const main = document.getElementById("main_content");
    main.classList.add("text-w");
    main.innerHTML = "";

    if (! path || path === "#/home") {
        main.appendChild(pages.home_controller());
    } else if (path === "#/products") {
        main.innerHTML = "<p>Productos</p>"
        console.info("productos")
    } else if (path === "#/posts") {
        main.appendChild(await pages.posts_controller());
    }

    return main;
}