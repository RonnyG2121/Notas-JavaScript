export const Main = () => {
    const regionPrincipal = document.createElement("main");
    regionPrincipal.id = "id_main";

    if (!location.hash.includes("#/search")) regionPrincipal.classList.add("grid-fluid");

    return regionPrincipal;
}