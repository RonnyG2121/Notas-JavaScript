import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormularioHijoComponent } from "./formulario-hijo/formulario-hijo.component";
import { ResultadoComponent } from "./resultado/resultado.component";

@Component({
  selector: 'app-calculadora',
  imports: [FormsModule, FormularioHijoComponent, ResultadoComponent],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {
  resultadoRecibido: number = 0;
  // cadena: string = ""
  recibirSuma(event: number) {
    this.resultadoRecibido = event;
    
  }


}
