import { Component } from '@angular/core';
import { ProductoComponent } from '../producto/producto.component';
import { Productos } from '../producto/producto.interface';
import { FormularioComponent } from '../formulario/formulario.component';
import { ListadoProductosService } from '../listado-productos.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [
    ProductoComponent, 
    // RouterOutlet,
    FormularioComponent,
    FormsModule

  ],
  
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {
  // Anteriormente, se realizó con la estructura de datos en el componente, ahora se hará mediante un servicio que almacene los datos, en este caso el arreglo.
  // Luego se usará una base de datos, pero todo concerniente a ello se hará desde el servicio
  productos: {[llave: string]: Productos} = {};
  productosSubscripcion: Subscription | null = null;

  constructor(private listadoProductoService: ListadoProductosService,
    private router: Router
  ) {}

ngOnInit() {
  this.getProductos();

  // Escuchar la lista del servicio que se actualiza con reactividad y los observables
  this.productosSubscripcion = this.listadoProductoService.productosActualizados.subscribe((productos) => {
    this.productos = productos;
  });
  
}

  getProductos() {
    this.listadoProductoService.obtenerProductos().subscribe((productos: {[llave: string]: Productos}) => {
      this.productos = productos;
      this.listadoProductoService.setProduct(productos);
    });
  }

  getLlave(): string[] {
    if (this.productos) {
      return Object.keys(this.productos);
    }
    return [];
  }


  agregarProducto() {
    this.router.navigate(['agregar']);
  }
  
 
  ngOnDestroy(): void {
if (this.productosSubscripcion !== null) {
    this.productosSubscripcion.unsubscribe();

}
  }
}