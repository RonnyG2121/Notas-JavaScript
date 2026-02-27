import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-hijo',
  imports: [FormsModule],
  templateUrl: './formulario-hijo.component.html',
  styleUrl: './formulario-hijo.component.css'
})
export class FormularioHijoComponent {
  valor1: number= 0;
  valor2: number = 0;
  @Output()
  resultado= new EventEmitter<number>;

  eventSuma() {
    const resultadoSuma = this.valor1 + this.valor2;
    this.resultado.emit(resultadoSuma);
    // this.cadena = `El resultado de la suma es: ${this.resultado}`;
  }

}