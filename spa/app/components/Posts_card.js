export const PostCard = (propiedades) => {
    let {
        id,
        date,
        slug,
        title,
        yoast_head_json,
        _embedded
    } = propiedades,
        urlPoster = _embedded["wp:featuredmedia"]
            ? _embedded["wp:featuredmedia"][0].source_url
            : "app/assets/favicon.ico";


    document.addEventListener("click", (ev) => {
        if (!ev.target.matches(".post-card a")) return false;

        localStorage.setItem("wpPostId", ev.target.dataset.id);
    });

            const dateFormat = new Date(date).toLocaleString("es-ES", {
                timeZone: "UTC",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                hour12: true,
                });

    return `<article class="post-card">
        <img src="${urlPoster}" alt="${title.rendered}">
            <h2>${title.rendered}</h2>
            <p>
            Post publicado por: <b> ${yoast_head_json.author}</b>
                <time datetime="${date}"> El ${dateFormat}</time>
                <a href="#/${slug}" data-id="${id}"> Ver publicación </a>
            </p>
    </article>`;
}