import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from "./cabecera/cabecera";
import { Formulario } from "./formulario/formulario";
import { Ingresos } from "./ingresos/ingresos";
import { Egresos } from "./egresos/egresos";
import { PresupuestoInterfface } from './presupuesto.interfface';
import { PresupuestoService } from './presupuesto.service';

@Component({
  selector: 'app-root',
  imports: [ Cabecera, Formulario, Ingresos, Egresos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'manejador-presupuestos';
  ingresos:PresupuestoInterfface[] = [];
  egresos:PresupuestoInterfface[] = [];

  constructor(private presupuestoService: PresupuestoService) {
    this.ingresos = presupuestoService.ingresos;
    this.egresos = presupuestoService.egresos;
  }

  getIngresoTotal(): number {
    let ingresoTotal:number = 0;
    this.ingresos.forEach((ingreso) => {
      ingresoTotal += ingreso.precio;
    });
    return ingresoTotal;
  }

  getEgresoTotal(): number {
    let egresoTotal: number = 0;
    this.egresos.forEach((egreso) => {
      egresoTotal += egreso.precio;
    });
    return egresoTotal;
  }

  getPorcentaje(): number {
    return (this.getEgresoTotal() / this.getIngresoTotal());
  }

  getPresupuesto(): number {
    return this.getIngresoTotal() - (this.getEgresoTotal());
  }
}