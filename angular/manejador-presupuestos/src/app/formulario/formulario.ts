import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PresupuestoService } from '../presupuesto.service';
import { PresupuestoInterfface } from '../presupuesto.interfface';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario {
  constructor(private presupuestoService: PresupuestoService) {}

  tipo:string = "ingresoOperacion";
descripcion: string= "";
precio!: number;

  cambiarOpcion(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.tipo = target.value;
  }

  agregar(event: Event) {
    if (this.descripcion !== "" && this.precio !== 0) {
      
      if (this.tipo === "ingresoOperacion") {
        this.presupuestoService.agregarIngreso({descripcion: this.descripcion, precio: this.precio});
        // console.log(elemento)
      } else if (this.tipo === "egresoOperacion") {
        this.presupuestoService.agregarEgreso({descripcion: this.descripcion, precio: this.precio});
      }
      
    }
          this.descripcion = "";
      this.precio = 0;
      // return;

  }

}