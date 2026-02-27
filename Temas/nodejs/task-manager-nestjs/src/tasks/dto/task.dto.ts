import { IsBoolean, IsString } from "class-validator";

export class TaskDto {
    // Esto es un DTO o data transfer object
    // Otra cosa que usaremos es un dto, que no es másque un modelado que define los datos que esperamos del cliente
    // Esto sirve para validar y establecer como tiene que venir la petición del cliente
    // Es Una clase que establece las propiedades o campos que recibimos. Esto sirve para validarlos
    // prácticamente le  da forma al objeto que mandamos y recibimos y a su vez valida con una serie de decoradores los datos que recibimos

    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsBoolean()
    state: boolean;


}