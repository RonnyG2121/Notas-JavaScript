import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Productos } from '../producto/producto.interface';
import { ListadoProductosService } from '../listado-productos.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  constructor(
    private listadoProductoService: ListadoProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // nombre!: ElementRef;
  // @ViewChild("nombre")
  // @ViewChild("descripcion")
  // @ViewChild("precio")
  // precio!: ElementRef;
  // descripcion!: ElementRef;
  llaveProducto: string | null = null;
  nombre: string = "";
  descripcion: string = "";
  precio: number = 0;
  // @Output()
  // objProducto = new EventEmitter<Productos>;
  objProducto: any;

  ngOnInit() {
    const llave = this.route.snapshot.paramMap.get('llave');

    // Verificando que la llave exista
    if (llave) {
      // Buscando dicho producto en el formulario
      const producto = this.listadoProductoService.obtenerProductoPorLlave(llave);
      // Verificando que dicho producto exista para cargarlo
      if (producto) {
        this.llaveProducto = llave;
        this.nombre = producto.nombre;
        this.descripcion = producto.descripcion;
        this.precio = producto.precio;
      }
      
    }

  }
  
  enviarProducto(evento: Event) {
    evento.preventDefault();
    if (this.nombre.trim().length > 0 && this.descripcion.trim().length > 0 && this.precio > 0) {
      this.objProducto = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio
      };

      if (this.llaveProducto !== null) {
        // Modo edición
        this.listadoProductoService.editarProducto(this.objProducto);
      } else {
        // Modo agregar
        this.listadoProductoService.agregarProducto(this.llaveProducto,this.objProducto);
      }

      // Reseteamos el formulario y navegamos
      this.llaveProducto = null;
      this.nombre = "";
      this.descripcion = "";
      this.precio = 0;
      this.router.navigate(['/']);
    }
  }

  cancelar() {
    this.router.navigate(['/'])
  }


}