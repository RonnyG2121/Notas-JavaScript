import stripe_claves from "./stripe_claves.js";
import STRIPECLAVES from "./stripe_claves.js";
const d = document,
    sectionComida = d.getElementById("comida"),
    template = d.getElementById("comida_template").content,
    fragmento = d.createDocumentFragment(),
    fetchOpciones = {
        headers: {
            Authorization: `Bearer ${STRIPECLAVES.secrect}`,
        },
    };

const moneyFormat = (num) => {
        return `€${num.slice(0, -2)},${num.slice(-2)}`;

}

let productos, precios;

Promise.all([
    fetch("https://api.stripe.com/v1/products", fetchOpciones),
    fetch("https://api.stripe.com/v1/prices", fetchOpciones)
])

    .then((respuestas) => {
        return Promise.all(respuestas.map((respuesta) => {
            return respuesta.json();
        }));
    })

    .then((json) => {
        //console.info(json);
        productos = json[0].data;
        precios = json[1].data;
        //console.info(productos, precios);

        precios.forEach((elemento) => {
            let dataProducto = productos.filter((p) => {
                return p.id === elemento.product;
            });
            //console.info(dataProducto);

            template.querySelector(".estilo-comidas").setAttribute("data-precio", elemento.id);
            template.querySelector("img").src = dataProducto[0].images[0];
            template.querySelector("img").alt = dataProducto[0].name;
            template.querySelector("figcaption").innerHTML = `
            ${dataProducto[0].name}
            <br>
            ${moneyFormat(elemento.unit_amount_decimal)}`;

            let clon = d.importNode(template, true);
            fragmento.appendChild(clon);
        });
        sectionComida.appendChild(fragmento);
    })

    .catch((err) => {
        console.error(err);
        let mensajeError = err.statusText || "Ocurrió un error al obtener los productos de la tienda";
        sectionComida.innerHTML = `<div> Error ${err.status} ${mensajeError} </div> `;
    });


d.addEventListener("click", (ev) => {
    if (ev.target.matches(".estilo-comidas *")) {
        let id_precios = ev.target.parentElement.getAttribute("data-precio");
        //console.info(id_precios);
        Stripe(stripe_claves.public)
            .redirectToCheckout({
                lineItems: [{ price: id_precios, quantity: 1, }],
                mode: "subscription",
                successUrl: "http://127.0.0.1:5500/success_checkout_stripe.html",
                cancelUrl: "http://127.0.0.1:5500/stripe_cancel.html",
            })
            .then((resp) => {
                //console.info(resp);
                if (resp.error) {
                    sectionComida.insertAdjacentHTML("afterend", resp.error.message);
                }
        })
}
});