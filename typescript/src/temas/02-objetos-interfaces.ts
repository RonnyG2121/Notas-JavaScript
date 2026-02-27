// const skills: string[] = [];

interface persona {
    nombre: string;
    vidass: string;
    salud: number;
    habilidades: string[];
};

const copiloto: persona = {
    nombre: "Ronny",
    vidass: "9",
    salud: 100,
    habilidades: [
        "volar",
        "caminar sobre el agua",
        "uso del ki"
    ]
};

console.table(copiloto);

export {}