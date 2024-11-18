
// Usando el método reduce() para reducir los elementos de un array a un único valor

const reducir = (ar) => {

    return ar.reduce((acumulador, elemento) => {
        console.log(`Acumulador: ${acumulador}`);
        console.log(`elemento: ${elemento}`);

        return acumulador + elemento;
    }, 0);

}

console.log(reducir([1, 2, 3, 4, 5]));
