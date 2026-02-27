import { Component } from '@angular/core';

@Component({
  selector: 'app-directivas',
  imports: [],
  templateUrl: './directivas.component.html',
  styleUrl: './directivas.component.css'
})
export class DirectivasComponent {
cambiarAutenticacion(): void {
  this.autenticado = !this.autenticado;
}
  autenticado: boolean = false;


}
