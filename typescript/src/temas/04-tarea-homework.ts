/*
    ===== Resolver este ejercicio de typescript =====
*/


interface SuperHero {
    name: string;
    age: number;
    address: Adress;
    showAddress(): string;
    
}

interface Adress {
    street: string;
    city: string;
    country: string;

}

const superHeroe: SuperHero = {
    name: 'Spiderman',
    age: 30,
    address: {
        street: 'Main St',
        city: 'NY',
        country: 'USA'
    },
    showAddress() {
        return `${this.name} es de ${this.address.country}. Vive en la calle ${this.address.street} en ${this.address.city}`;
    }
}


const address = superHeroe.showAddress();
console.log( address );





export{}