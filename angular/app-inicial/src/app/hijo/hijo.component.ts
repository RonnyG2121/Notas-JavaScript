import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-hijo',
  imports: [],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent {
  @Input()
  mensajeAHijo: string = "";

  // Usando el concepto de comunicación entre componentes
  // Ahora toca el output, para la salida de información de un componente secundario a un componente principal o un componente hijo a un componente padre
  @Output()
  saludoDeHijo= new EventEmitter<string>;
  // Emitiendo un evento al componente padre
  enviarSaludoAPapa() {
    this.saludoDeHijo.emit("Hola papá como estás");
  }

}
