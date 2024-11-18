const d = document;

export default function Busqueda(input = "", filtro = "") {
    d.addEventListener("keyup", (e) => {
        if (e.target.matches(input)) {
            //console.info(e.key);
            //console.info(e.target.value);
            d.querySelectorAll(filtro).forEach((i) => {
                i.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                    ? i.classList.remove("filter")
                    : i.classList.add("filter");
            });

        }

        if (e.key === "Escape") {
            e.target.value = "";
        }



    });

}