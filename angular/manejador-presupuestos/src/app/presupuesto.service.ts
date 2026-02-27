import { Injectable } from '@angular/core';
import { PresupuestoInterfface } from './presupuesto.interfface';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  ingresos:PresupuestoInterfface[] = [
    {
      descripcion: "Salario",
      precio: 4000
    },
    {
      descripcion: "Venta de Carro",
      precio: 500
    }
  ];

  egresos:PresupuestoInterfface[] = [
    {
      descripcion: "Renta de departamento",
      precio: 900
    },
    {
      descripcion: "Ropa",
      precio: 200
    }];

  eliminarIngreso(ingreso: PresupuestoInterfface) {
    const ingresoBuscado:number  = this.ingresos.indexOf(ingreso);
  this.ingresos.splice(ingresoBuscado, 1);
}

  eliminarEgreso(egreso: PresupuestoInterfface) {
    const egresoBuscado:number  = this.egresos.indexOf(egreso);
  this.egresos.splice(egresoBuscado, 1);
}

  constructor() { }

  agregarIngreso(ingreso: PresupuestoInterfface) {
    this.ingresos.push(ingreso);
  }

  agregarEgreso(egreso: PresupuestoInterfface) {
    this.egresos.push(egreso);
  }

}