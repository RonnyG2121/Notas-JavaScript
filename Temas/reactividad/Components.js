
const Components = (function () {
    const constructor = function (opciones = {}) {
        this.elemento = opciones.elemento;
        this.data = opciones.data;
        this.template = opciones.template;

    };

    constructor.prototype.render = function () {
        const $elemento = document.querySelector(this.elemento);

        if (!$elemento) {
            return;
        } else {
            $elemento.innerHTML = this.template(this.data);
        }

    }

    constructor.prototype.setState = function (obj) {
        for (let key in obj) {
            if (this.data.hasOwnProperty(key)) {
                this.data[key] = obj[key];
            }
        }

        this.render();

    }

    constructor.prototype.getState = function () {
        return JSON.parse(JSON.stringify(this.data));
    }
    return constructor;
}
)();