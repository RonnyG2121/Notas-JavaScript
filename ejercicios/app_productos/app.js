// Creando las clases para el funcionamiento de la página

// Añadiendo la clase Producto
class Producto {
    constructor(id_nombre, id_precio, id_anno_creado) {
        this.id_nombre = id_nombre;
        this.id_precio = id_precio;
        this.id_anno_creado = id_anno_creado;
        }

}

// Creando la clase para la interface
class UI {

        // Método que añade un producto
    addProducto() {
var x;
    }

// Método que eliminará los productos
delProductos() {
}

// Método que Mostrará mensajes en pantalla cuando gestionemos los productos
muestraMensaje() {
}

}

// Evento cuando el usuario pulsa en el botón guardar y obtiene la información desde el formulario
document.getElementById("form_productos").addEventListener("submit", function(e){
    const nombre = document.getElementById("nombre_producto").value;
    const precio = document.getElementById("precio_producto").value;
    const anno = document.getElementById("anno_creado").value;
    console.log(nombre, precio, anno);
    e.preventDefault();} );
