import Stripe from "stripe";
import { PRIVATE_STRIPE_KEY } from "../config.js";

const stripe = new Stripe(PRIVATE_STRIPE_KEY);


/*export const home = (req, res) => {
    res.send("Hola mundo!");
}
*/
export const createSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: "Smartphone",
                            description: "Excelente teléfono para jugar los juegos más exigentes",
                        },
                        currency: "eur",
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },

                {
                    price_data: {
                        product_data: {
                            name: "Computadora",
                            description: "Esta es una computadora potente",
                        },
                        currency: "eur",
                        unit_amount: 30000,
                    },
                    quantity: 5,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
        console.log(session);

        return res.json({
            url: session.url,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,});
    }
    //res.send("Cancelado");
}


export const success = (req, res) => {
    return res.redirect("/success.html");
}

export const cancel = (req, res) => {
    return res.redirect("/cancel.html")
}
