
const fibo = (num) => {
    let secuencia = [
        0,
        1
    ];
    for (let i = 2; i < num; i++) {
        secuencia[i] = secuencia[i - 1] + secuencia[i - 2];
        let resultado1 = secuencia[i -1];
        let resultado2 = secuencia[i -2];
        console.log(resultado1);
        console.log(resultado2);
    }
    return secuencia;
}

console.log(fibo(10));

