import { Component } from '@angular/core';
import { ProductoComponent } from '../producto/producto.component';
import { Productos } from '../producto/producto.interface';
import { FormularioComponent } from './formulario/formulario.component';
import { ListadoProductosService } from './listado-productos.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-productos',
  imports: [ProductoComponent, 
    // RouterOutlet,
    // FormularioComponent,
    FormsModule

  ],
  
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {
  // Anteriormente, se realizó con la estructura de datos en el componente, ahora se hará mediante un servicio que almacene los datos, en este caso el arreglo.
  // Luego se usará una base de datos, pero todo concerniente a ello se hará desde el servicio

  listaProductos: Productos[] = [];

  constructor(private listadoProductoService: ListadoProductosService, 
    private router: Router
  ) {}

ngOnInit() {
  this.listaProductos = this.listadoProductoService.obtenerProductos();
  console.log(this.listadoProductoService.obtenerProductos());

}


  agregarProducto() {
    this.router.navigate(['agregar']);
  }
  
  
}