import Wp_api from "./Wp_api.js";
import { Ajax } from "./Ajax.js";
import { PostCard } from "../components/Posts_card.js";
import { SearchCard } from "../components/Search_card.js";


export const ScrollInfinito = async () => {
    const d = document,
        w = window;

    let query = localStorage.getItem("wpSearch"),
        apiURL,
        Component;

    w.addEventListener("scroll", async (ev) => {
        let { scrollTop, clientHeight, scrollHeight } = d.documentElement,
            { hash } = w.location;

        if (scrollTop + clientHeight >= scrollHeight) {
            Wp_api.page ++;

            if (! hash || hash === "#/inicio") {
                apiURL = `${Wp_api.posts}&page=${Wp_api.page}`;


                Component = PostCard;
            } else if (hash.includes("#/search")) {
                apiURL = `${Wp_api.search}${query}&page=${Wp_api.page}`;
                Component = SearchCard;
            } else {
                return false;
            }
            d.querySelector(".loader").style.display = "block";

            await Ajax({
                url: apiURL,
                exito: (postsScroll) => {
                    //console.info(postsScroll);
                    let html = "";
                    postsScroll.forEach((elementoScroll) => {
                        html += Component(elementoScroll);
                    });

                    d.getElementById("id_main").insertAdjacentHTML("beforeend", html);
                    d.querySelector(".loader").style.display = "none";
                },
            });
        }

    });
}