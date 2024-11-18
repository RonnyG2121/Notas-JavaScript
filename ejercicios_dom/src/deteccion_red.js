const d = document;
const n = navigator;
const w = window;

export function redStatus() {
    //console.info(n.onLine);
    const esOnline = () => {
        const contenedor = d.createElement("div role='alert'");
        if (n.onLine) {
            contenedor.textContent = "Ya tienes conexión";
            contenedor.classList.add("online");
            contenedor.classList.remove("ofline");
        } else {
            contenedor.textContent = "Conéctate a una red";
            contenedor.classList.add("ofline");
            contenedor.classList.remove("online");
        }
        d.body.insertAdjacentElement("afterbegin", contenedor);

        setTimeout(() => {
            d.body.removeChild(contenedor);
        }, 3000);
    }


    w.addEventListener("online", (e) => {
        esOnline();
    });
    w.addEventListener("offline", (e) => {
        esOnline();
    });

}