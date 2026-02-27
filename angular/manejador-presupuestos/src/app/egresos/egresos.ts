import { Component, Input } from '@angular/core';
import { PresupuestoService } from '../presupuesto.service';
import { PresupuestoInterfface } from '../presupuesto.interfface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-egresos',
  imports: [CommonModule],
  templateUrl: './egresos.html',
  styleUrl: './egresos.css'
})
export class Egresos {
  egresos: PresupuestoInterfface[] = [];
  @Input()
  ingresoTotal!: number;
  // @Input()
  // porcentajeTotal!: number;

  constructor(private presupuestoService: PresupuestoService) {
    this.egresos = this.presupuestoService.egresos;
  }

  eliminarRegistro(egreso: PresupuestoInterfface) {
    this.presupuestoService.eliminarEgreso(egreso);
  }

  calculaPorcentaje(egreso: PresupuestoInterfface) {
    return egreso.precio / this.ingresoTotal;
  }

}