import { Injectable } from '@angular/core';
import { Productos } from './producto/producto.interface';
import { DatosService } from './datos.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListadoProductosService {
  productos: { [llave: string]: Productos } = {};
    productosActualizados = new Subject<{[llave: string]: Productos}>();

  constructor(private datosService: DatosService) { }

  obtenerProductos() {
    return this.datosService.listarProductos();
  }

  obtenerProductoPorLlave(llave: string): Productos | undefined {
    /*    this.listaProductos.find((producto) => producto.llave === llave);*/
    return undefined;
  }

  agregarProducto(llave: string | null=null, producto: Productos) {
     if (llave=== null) {
        // llave = this.generrarId();
        this.datosService.guardarProducto(producto).subscribe(() => {
                  // console.log(`Se agrego el nuevo producto: ${producto.descripcion} - ${producto.precio}`);
                  this.refrescar()
                });
        
    }
       }


  private refrescar() {
    this.obtenerProductos().subscribe((productos: {[llave: string]: Productos}) => {
      this.setProduct(productos);
    });
  }

  setProduct(productos: {[llave: string]: Productos}) {
    this.productos = productos;
    // Emitir la actualización
    this.productosActualizados.next(this.productos);
  }

  
  editarProducto(producto: Productos | undefined) {
    /*      const indice = this.listaProductos.findIndex((p) => p.id === producto.id);
         if (indice !== -1) {
         this.listaProductos[indice] = producto;
         }
         this.listaProductos.push(producto);
    
     */
    return undefined
  }

  eliminarProducto(id: number) {
    /*     const indice = this.listaProductos.findIndex((p) => p.id === id);
        if (indice !== -1) {
        this.listaProductos.splice(indice, 1)
        }
     */
    return undefined

  }

  generrarId() {
    // return this.id+=1;
  }

}
