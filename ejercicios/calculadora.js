window.onload = function() {
    // Asigna la función "numeros" al evento keypress del elemento con el id "valor"
    document.getElementById("valor").onkeypress = function(event){
        return numeros(event);
    }
}

/*****************
F U N C I O N E S
******************/

function numeros(e){
    // Obtiene el código de la tecla presionada
    let tecla = e.keyCode;
    // Convierte el código de la tecla en el carácter correspondiente
    let teclado = String.fromCharCode(tecla);
    // Define un array de teclas especiales
    let especiales = new Array();
    especiales["backspace"] = 8;
    especiales["izquierda"] = 37;
    especiales["derecha"] = 39;
    // Bandera para verificar si la tecla es especial
    let bandera = false;
    // Define los caracteres numéricos permitidos
    let numeros = "0123456789.";

    // Verifica si la tecla es especial
    bandera = especiales.includes(tecla);

    // Verifica si el carácter presionado no está en la lista de caracteres permitidos y no es una tecla especial
    if(numeros.indexOf(teclado)==-1 && bandera==false){
        return false; // Detiene la propagación del evento keypress
    }
}
