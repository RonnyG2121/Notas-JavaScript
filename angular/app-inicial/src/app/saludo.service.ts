import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaludoService {

  constructor() { }

  private saludo = "Hola desde el servicio";

    saludar(): string {
      return this.saludo;
  }

}
