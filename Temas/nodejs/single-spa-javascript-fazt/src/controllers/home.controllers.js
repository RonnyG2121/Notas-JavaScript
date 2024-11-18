import view from "../view/home.html";

export const home = () => {
    let div = document.createElement("div");
    div.innerHTML = view;
    const btn_click = div.querySelector("#btn_click");

    btn_click.addEventListener("click", (ev) => {
        alert("¡Click!");
    });
    return div;
}