export const SearchCard = (propiedades) => {
  let {
    id,
    title,
    _embedded
  } = propiedades,
    slug = _embedded.self[0].slug,
    date = _embedded.self[0].date,
    dateFormat = new Date(date).toLocaleString("es-ES", {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      hour12: true,
      });

  return `
    <article class="post-card">
    <h2>${title}</h2>
    <p>
    Publicado
    <time datetime="${date}">El ${dateFormat}</time>
    <a href="#/${slug}" data-id="${id}"> Ver Publicación </a>
    </p>
</article>`;
}