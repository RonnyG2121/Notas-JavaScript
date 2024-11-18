import { home } from "./home.controllers.js";
import { posts } from "./posts.controllers.js";
//import { noEncontrado } from "./no_encontrado.controllers.js";

const pages = {
    home_controller: home,
    posts_controller: posts,
    //no_encontrado_controller: noEncontrado
};
export { pages };