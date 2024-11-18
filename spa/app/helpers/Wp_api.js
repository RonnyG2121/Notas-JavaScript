const nombre = "nvda",
    dominio = `https://${nombre}.es`,
    sitio = `${dominio}/wp-json`,
    apiWordpress = `${sitio}/wp/v2`,
    perPage = 10,
    posts = `${apiWordpress}/posts?_embed&per_page=${perPage}`,
    unipost = `${apiWordpress}/posts`,
    search = `${apiWordpress}/search?_embed&per_page=${perPage}&search=`;

let page = 1;

//Si el parámetro de la propiedad de un objeto es igual al nombre del valor, se puede simplificar de la siguiente manera
//esto se va a exportar por defecto

export default {
    nombre,
    dominio,
    sitio,
    apiWordpress,
    perPage,
    posts,
    unipost,
    search,
    page
};
