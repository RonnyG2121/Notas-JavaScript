const d = document;
const n = navigator;
const usuarioAgente = n.userAgent;


export default function deviceInfo(id) {
    //console.info(usuarioAgente);
    const info = d.getElementById(id);
    const esMovil = {
        android: () => usuarioAgente.match(/android/i),
        ios: () => usuarioAgente.match(/iphone|ipad|ipod/i),
        any: function () {
            return this.android() || this.ios();
        }
    };
    const esEscritorio = {
        linux: () => usuarioAgente.match(/linux/i),
        mac: () => usuarioAgente.match(/mac os/i),
        windows: () => usuarioAgente.match(/windows nt/i),
        any: function () {
            return this.linux() || this.mac() || this.windows();
        }
    };
    const browser = {
        chrome: () => usuarioAgente.match(/chrome/i),
        safari: () => usuarioAgente.match(/safari/i),
        firefox: () => usuarioAgente.match(/firefox/i),
        opera: () => usuarioAgente.match(/opera|opera mini/i),
        ie: () => usuarioAgente.match(/iemovile/i),
        edge: () => usuarioAgente.match(/edge/i),
        any: function () {
            return this.ie() || this.edge() || this.chrome() || this.safari() || this.firefox() || this.opera();
        }
    };

    info.innerHTML = `<ul>
      <li>User Agent: <b>${usuarioAgente}
      </b></li>
      <li>Sistema Operativo: <b>${esMovil.any() ? esMovil.any() : esEscritorio.any()}
      </b></li>
      <li>Navegador: <b>${browser.any()}</b></li>
    </ul>
    `;

    if (browser.chrome()) {
        info.innerHTML += `<p><mark> Este contenido solo se ve en Chrome </mark></p>`;
    }
    if (browser.firefox()) {
        info.innerHTML += `<p><mark> Este contenido solo se ve en Firefox </mark></p>`;
    }
    if (esEscritorio.linux()) {
        info.innerHTML += `<p><mark> Descarga nuestro software para Linux </mark></p>`;
    }
    if (esEscritorio.mac()) {
        info.innerHTML += `<p><mark> Descarga nuestro software para Mac OS </mark></p>`;
    }
    if (esEscritorio.windows()) {
        info.innerHTML += `<p><mark> Descarga nuestro software para Windows </mark></p>`;
    }

}