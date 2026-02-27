import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IndexedDbService } from '../indexed-db.service';

@Component({
  selector: 'app-cortometraje-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cortometraje-detalle.component.html',
  styleUrl: './cortometraje-detalle.component.css'
})
export class CortometrajeDetalleComponent implements OnInit {
  cortometraje: any = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private indexedDbService: IndexedDbService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('CortometrajeDetalleComponent: ID recibido de la URL (ngOnInit):', id, 'Tipo:', typeof id);
    if (id) {
      this.loadCortometraje(id);
    } else {
      this.isLoading = false;
    }
  }

  async loadCortometraje(id: string): Promise<void> {
    console.log('CortometrajeDetalleComponent: Iniciando loadCortometraje para ID:', id);
    this.isLoading = true;
    try {
      const catalog = await this.indexedDbService.getCatalog();
      if (catalog && catalog.cortometrajesMap) {
        console.log('CortometrajeDetalleComponent: Catálogo de cortometrajes cargado. Intentando obtener cortometraje con ID:', id);
        const foundCortometraje = catalog.cortometrajesMap.get(id);
        console.log('CortometrajeDetalleComponent: Resultado de cortometrajesMap.get(id):', foundCortometraje);
        this.cortometraje = foundCortometraje;
        if (this.cortometraje) {
          console.log('CortometrajeDetalleComponent: Cortometraje encontrado y asignado:', this.cortometraje);
        } else {
          console.warn('CortometrajeDetalleComponent: Cortometraje NO encontrado para ID:', id);
        }
      }
    } catch (error) {
      console.error('Error al cargar el cortometraje:', error);
    } finally {
      this.isLoading = false; // Asegurarse de que isLoading sea false al finalizar
      console.log('CortometrajeDetalleComponent: Finalizando loadCortometraje. isLoading:', this.isLoading, 'cortometraje:', !!this.cortometraje);
    }
  }

  volver(): void {
    this.location.back();
  }
}
