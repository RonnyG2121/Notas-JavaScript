export const SearchForm = () => {
    const d = document,
        formulario = d.createElement("form"),
        input = d.createElement("input"),
        label = d.createElement("label");
    label.setAttribute("for", "id_search");
    formulario.classList.add("search-form");
    formulario.appendChild(label);
    label.innerHTML = "Buscar";
    formulario.appendChild(input);
    input.type = "search";
    input.id = "id_search";
    input.name = "search";
    input.placeholder = "Busca aquí";

    if (location.hash.includes("#/search")) {
        input.value = localStorage.getItem("wpSearch");
    }
    document.addEventListener("search", (ev) => {
        if (!ev.target.matches("input[type='search']")) return false;

        if (!ev.target.value) localStorage.removeItem("wpSearch");
    });

    d.addEventListener("submit", (ev) => {
        if (!ev.target.matches(".search-form")) {
            return false;
        } else {
            ev.preventDefault();
            localStorage.setItem("wpSearch", ev.target.search.value);

            location.hash = `#/search?search=${ev.target.search.value}`;
        }
    });

    return formulario;
}