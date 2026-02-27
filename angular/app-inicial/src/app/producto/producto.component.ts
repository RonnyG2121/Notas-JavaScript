import { Component, Input } from '@angular/core';
// import { Productos } from './producto.interface';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from '../listado-productos/formulario/formulario.component';
import { Productos } from './producto.interface';
import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
import { ListadoProductosService } from '../listado-productos/listado-productos.service';

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input()
  producto!: Productos;

  constructor(private listadoProductoService: ListadoProductosService,
    private router: Router
  ) { }

    editarProducto(id: number) {
    this.router.navigate(['/editar', id])
  }

    eliminarProducto(id: number | null) {
      this.listadoProductoService.eliminarProducto(id);
    this.router.navigate(['/tienda'])
  }



}