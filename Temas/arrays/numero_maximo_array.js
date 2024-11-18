

const numeroMaximoArray = (ar=[]) => {
    for (const i in ar) {
        if ( typeof ar[i] === "number") {
            return Math.max(...ar);
        }
        
        else {
            return "Este array debe tener solo números";
        }

    }
}


console.log(numeroMaximoArray([5, 8, 2, 20, 50, 12, 100, 500, 600, 700]));