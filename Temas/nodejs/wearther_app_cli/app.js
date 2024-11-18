import axios from "axios";
import { config } from "./config.js";



const obtenerData = () => {
    const city = process.argv[2];
    // console.log(city);

    if (city === undefined) {
        console.warn("Por favor ingrese los parámetros correctos");
    } else {
        obtenerClima(city)

            .then((weatherData) => {
                console.info(`Estos son los datos de la ciudad: ${weatherData.name}`);
                console.info(`Descripción: ${weatherData.weather[0].description}`);
                console.info(`Temperatura: ${weatherData.main.temp} Grados Celsius`);
                console.info(`Velociad del viento: ${weatherData.wind.speed} KMH`);
                console.info(`pís de la ciudad: ${weatherData.sys.country}`)
            })
            .catch((error) => {
                console.error(error);
            });
    }

}


const obtenerClima = async (city) => {
    const miClima = config.miClima;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${miClima}&lang=es`;

        const respuesta = await axios.get(url, {
            params: {
                q: city,
                appid: miClima,
                units: "metric"
            }
        });

        // console.log(respuesta.data);

        return respuesta.data;
    } catch (error) {
        console.error(error);
    }
}


obtenerData();