function burbujaPaso() {
    let lista = [5, 3, 9];
    let n = lista.length;
    console.log("Lista inicial:", lista);

    for (let k = 0; k < n; k++) {
        console.log("---- pasada k =", k, "----");
        for (let i = 0; i < (n - 1 - k); i++) {
            // capturamos los valores para mostrar
            let a = lista[i];
            let b = lista[i + 1]; // puede ser undefined
            console.log("comparando k =", k, "i =", i, "lista[i] =", a, "con lista[i+1] =", b);

            if (b === undefined) {
                console.log("    -> nota: lista[i+1] es undefined (acceso fuera de rango)");
            }

            if (a < b) {
                // intercambio
                lista[i] = b;
                lista[i + 1] = a;
                console.log("    -> intercambio realizado. lista ahora:", lista);
            } else {
                console.log("    -> no hay intercambio. lista sigue:", lista);
            }
        }
    }

    console.log("Lista final:", lista);
}

burbujaPaso();
