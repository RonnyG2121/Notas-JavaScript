export const Post = (propiedades) => {
    let {
        content,
        date,
        title,
    } = propiedades,
        dateFormat = new Date(date).toLocaleString();
    return `
    <section class="post-page">
    <aside>
    <h2>${title.rendered}</h2>
    <time datetime="${date}" >${dateFormat}</time>
    </aside>
    <hr>
    <article>${content.rendered}</article>
    </section>
    `;
}