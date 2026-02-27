import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IndexedDbService } from '../indexed-db.service';

@Component({
  selector: 'app-pelicula-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pelicula-detalle.component.html',
  styleUrl: './pelicula-detalle.component.css'
})
export class PeliculaDetalleComponent implements OnInit {
  pelicula: any = null;
  isLoading: boolean = true;
  currentPartUrl: string = ''; // Nueva: URL de la parte actual
  selectedPart: number = 1; // Nueva: Parte seleccionada actualmente

  constructor(
    private route: ActivatedRoute,
    private indexedDbService: IndexedDbService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPelicula(id);
    } else {
      this.isLoading = false; // No hay ID, no hay carga
    }
  }

  async loadPelicula(id: string): Promise<void> {
    this.isLoading = true; // Iniciar carga
    try {
      const catalog = await this.indexedDbService.getCatalog();
      if (catalog && catalog.peliculasMap) {
        const foundPelicula = catalog.peliculasMap.get(id);
        this.pelicula = foundPelicula;
        
        if (this.pelicula) {
          // Inicializar la URL de la parte actual
          if (this.pelicula.enlaces && this.pelicula.enlaces.length > 0) {
            this.selectPart(1); // Seleccionar la primera parte por defecto
          }
        }
      }
    } catch (error) {
      
    } finally {
      this.isLoading = false; // Asegurarse de que isLoading sea false al finalizar
    }
  }

  hasMultipleParts(): boolean {
    return this.pelicula?.partes && parseInt(this.pelicula.partes, 10) > 1;
  }

  getPartsArray(): number[] {
    const numParts = parseInt(this.pelicula?.partes || '1', 10);
    return Array.from({ length: numParts }, (_, i) => i + 1);
  }

  selectPart(partNumber: number): void {
    if (this.pelicula && this.pelicula.enlaces && this.pelicula.enlaces[partNumber - 1]) {
      this.selectedPart = partNumber;
      this.currentPartUrl = this.pelicula.enlaces[partNumber - 1];
    }
  }

  volver(): void {
    this.location.back();
  }
}
