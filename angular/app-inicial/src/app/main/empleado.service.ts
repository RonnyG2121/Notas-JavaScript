import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  empleados: [] | any = [
    { nombre: "Juan Perez", fechaNacimiento: new Date("1990-11-29"), sueldo: 30000 },
    { nombre: "Pedro F", fechaNacimiento: new Date("1985-04-12"), sueldo: 32000 },
    { nombre: "marta D", fechaNacimiento: new Date("1979-10-02"), sueldo: 20000 },
    { nombre: "Carlos S", fechaNacimiento: new Date("2000-02-05"), sueldo: 12000 },
  ];
  constructor() { }


  get obtenerEmpleados() {
    return this.empleados;
  }

}