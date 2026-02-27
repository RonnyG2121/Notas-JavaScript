import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  ahora = new Date();
  fecha: number;
  mes: string;
  anio: number;

  constructor() {
    this.fecha = this.ahora.getDate();
    const mesNumerico = this.ahora.getMonth() + 1;
    this.mes = mesNumerico < 10 ? "0" + mesNumerico : mesNumerico.toString();
    this.anio = this.ahora.getFullYear();
  }
}
