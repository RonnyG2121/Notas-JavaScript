import { Component } from '@angular/core';
import { PresupuestoService } from '../presupuesto.service';
import { PresupuestoInterfface } from '../presupuesto.interfface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingresos',
  imports: [CommonModule],
  templateUrl: './ingresos.html',
  styleUrl: './ingresos.css'
})
export class Ingresos {
  ingresos:PresupuestoInterfface[] = [];
  constructor(private presupuestoService: PresupuestoService) {
    this.ingresos = this.presupuestoService.ingresos;
  }

  eliminarRegistro(ingreso: PresupuestoInterfface) {
    this.presupuestoService.eliminarIngreso(ingreso);
  }

}