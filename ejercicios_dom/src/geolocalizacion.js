const d = document,
    n = navigator;

export default function getLocation(id = "") {
    const idLocation = d.getElementById(id);
    const opciones = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const exito = (posicion) => {
        let coords = posicion.coords;
        idLocation.innerHTML = `
    <p>Tu posición actual es:</p>
    <ul>
      <li>Latitud: <b>${coords.latitude}</b></li>
      <li>Longitud: <b>${coords.longitude}</b></li>
      <li>Precisión: <b>${coords.accuracy}</b> metros</li>
    </ul>
    <a href="https://www.google.com/maps/@${coords.latitude},${coords.longitude},20z" target="_blank" rel="noopener">Ver en Google Maps</a>
    `;
    }

    const error = (err) => {
        idLocation.innerHTML = `<p><mark>Error ${err.code}: ${err.message} </mark></p>`;

    }

    n.geolocation.getCurrentPosition(exito, error, opciones);
}