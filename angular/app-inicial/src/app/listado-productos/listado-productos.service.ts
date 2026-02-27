import { Injectable } from '@angular/core';
import { Productos } from '../producto/producto.interface';
import { Observable, of } from 'rxjs';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root'
})
export class ListadoProductosService {
  id: number = 0;
  listaProductos: Productos[] = [
    {
      id: this.generrarId(),
      nombre: "Camiseta",
      descripcion: "Camiseta para deportes",
      precio: 15
    },
    {
      id: this.generrarId(),
      nombre: "Smartphone",
      descripcion: "Teléfono inteligente de última generación",
      precio: 200
    },
    {
      id: this.generrarId(),
      nombre: "Piano",
      descripcion: "Piano de excelente calidad",
      precio: 1300
    }
  ];

  constructor() { }

obtenerProductos(): Productos[] {
  return this.listaProductos;
}

obtenerProductoPorId(id: number): Productos | undefined {
return this.listaProductos.find((producto) => producto.id === id);
}

  agregarProducto(producto: Productos) {
    if (producto.id === null) {
      producto.id = this.generrarId()
      this.listaProductos.push(producto);
      
    }
  }
  
  editarProducto(producto: Productos) {
    const indice = this.listaProductos.findIndex((p) => p.id === producto.id);
    if (indice !== -1) {
      this.listaProductos[indice] = producto;
    }
    // this.listaProductos.push(producto);
  }

  eliminarProducto(id: number | null) {
    const indice = this.listaProductos.findIndex((p) => p.id === id);
    if (indice !== -1) {
      this.listaProductos.splice(indice, 1)
    }

  }

  generrarId(): number {
    return this.id+=1;
  }

}