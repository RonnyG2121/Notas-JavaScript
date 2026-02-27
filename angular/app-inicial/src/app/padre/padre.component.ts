import { Component } from '@angular/core';
import { HijoComponent } from "../hijo/hijo.component";

// Este componente es  para trabajar la comunicación entre componentes.
// Este, es el componente padre, donde se definirá una propiedad que luego se podrá pasar al hijo sin la necesidad de importarlo, gracias al decorador @input()
// El input se pasa al componente hijo en la propiedad definida aquí, con el mismo nombre
// Donde llamemos el selector del componente hijo, debemos pasar la propiedad con la sintaxis [propiedad]="valor"
@Component({
  selector: 'app-padre',
  imports: [HijoComponent],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.css'
})
export class PadreComponent {
  saludo: string = "";
saludoEscuchado(saludo: string) {
  this.saludo = saludo;

}
  mensajePapa: string = "Hola hijo.";

}
