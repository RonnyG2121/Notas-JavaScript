import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  constructor(public appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.loadCatalog();
  }

  loadCatalog(): void {
    this.appService.loadCatalog().subscribe({
      next: (data) => {
        // console.log('Catálogo cargado exitosamente, redirigiendo...');
        this.router.navigate(['/catalogo']);
      },
      error: (err) => {
        // console.error('Error al cargar el catálogo en el componente:', err);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  goToCatalog(): void {
    this.router.navigate(['/catalogo']);
  }
}
