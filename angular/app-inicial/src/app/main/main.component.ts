import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import localeEs from "@angular/common/locales/es"
import { EmpleadoService } from './empleado.service';

registerLocaleData(localeEs, "es");

@Component({
  selector: 'app-main',
  imports: [FormsModule, CommonModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  empleados: [] | any = [];
  constructor(private empleadosService: EmpleadoService) {

    this.empleados = this.empleadosService.obtenerEmpleados;
  }
  // Aplicando el concepto de local reference mediante la plantilla html, donde se creará unan referencia al elemento
  // Luego se manipulará mediante una variable y un evento, pero es todo lo que se hará aquí
  pais: string = "";

  agregarPais(nuevoPais: string): void {
    this.pais = nuevoPais;
  }

  // Usando el concepto de two way binding, esto es para mantener los datos sincronizados entre componentes o entre la vista html y el componente typescript
  nombre: string = "Ronny";


  texto: string = "";
  actualizarTexto(event: Event) {
    const inputTexto = event.target as HTMLInputElement;
    this.texto = inputTexto.value;
  }
  mensaje: string = "";
  mostrarMensaje(): void {
    this.mensaje = "Escuchando el evento click";
  }


  ocultarMensaje(): void {
    this.mensaje = "";
  }


}