import { Component, Input } from '@angular/core';
// import { Productos } from './producto.interface';
// import { FormsModule } from '@angular/forms';
import { Productos } from './producto.interface';
// import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
// import { ListadoProductosService } from '../listado-productos.service';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input() producto!: Productos;
  @Input() llave!: string;

  constructor(
    private router: Router
  ) { }

    editarProducto(llave: string) {
    this.router.navigate(['/editar', llave])
  }

    eliminarProducto(llave: string) {
      // this.listadoProductoService.eliminarProducto(id);
    this.router.navigate(['/'])
  }



}