import Wp_api from "../helpers/Wp_api.js";
import { Ajax } from "../helpers/Ajax.js";
import { PostCard } from "./Posts_card.js";
import { Post } from "./Post.js";
import { SearchCard } from "./Search_card.js";
import { ContactForm } from "./Contact_form.js";



export const Router = async () => {
    let { hash } = location,
        regionPrincipal = document.getElementById("id_main");
    regionPrincipal.innerHTML = null;

    if (!hash || hash === "#/inicio") {
        await Ajax({
            url: Wp_api.posts,
            exito: (posts) => {
                let html = "";
                posts.forEach((elementoP) => {
                    html += PostCard(elementoP);
                });
                //console.info(posts);
                regionPrincipal.innerHTML = html;
            },
        });

    } else if (hash.includes("#/search")) {
        let query = localStorage.getItem("wpSearch");
        if (!query) {
            document.querySelector(".loader").style.display = "none";
            return false;
        } 
            await Ajax({
                url: `${Wp_api.search}${query}`,
                exito: (search) => {
                    console.info(search);
                    let html = "";
                    if (search.length === 0) {
                        html = `
                        <p class="error"> 
                        No hemos encontrado 
                        <mark> ${query}</mark>
                        </p>`;
                    } else {
                        search.forEach((elementoS) => {
                            html += SearchCard(elementoS);
                        });
                    }
                    regionPrincipal.innerHTML = html;
                },
            });

    } else if (hash === "#/contacto") {
        regionPrincipal.appendChild(ContactForm());
    } else {
        await Ajax({
            url: `${Wp_api.unipost}/${localStorage.getItem("wpPostId")}`,
            exito: (elementoP) => {
                regionPrincipal.innerHTML = Post(elementoP);
            },
        });

    }

    document.querySelector(".loader").style.display = "none";
}