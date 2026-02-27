import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IndexedDbService } from '../indexed-db.service';

@Component({
  selector: 'app-documental-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './documental-detalle.component.html',
  styleUrl: './documental-detalle.component.css'
})
export class DocumentalDetalleComponent implements OnInit {
  documental: any = null;
  isLoading: boolean = true; // Añadir estado de carga

  constructor(
    private route: ActivatedRoute,
    private indexedDbService: IndexedDbService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('DocumentalDetalleComponent: ID recibido de la URL (ngOnInit):', id, 'Tipo:', typeof id);
    if (id) {
      this.loadDocumental(id);
    } else {
      this.isLoading = false;
    }
  }

  async loadDocumental(id: string): Promise<void> {
    console.log('DocumentalDetalleComponent: Iniciando loadDocumental para ID:', id);
    this.isLoading = true;
    try {
      const catalog = await this.indexedDbService.getCatalog();
      if (catalog && catalog.documentalesMap) {
        console.log('DocumentalDetalleComponent: Catálogo de documentales cargado. Intentando obtener documental con ID:', id);
        const foundDocumental = catalog.documentalesMap.get(id);
        console.log('DocumentalDetalleComponent: Resultado de documentalesMap.get(id):', foundDocumental);
        this.documental = foundDocumental;
        if (this.documental) {
          console.log('DocumentalDetalleComponent: Documental encontrado y asignado:', this.documental);
        } else {
          console.warn('DocumentalDetalleComponent: Documental NO encontrado para ID:', id);
        }
      }
    } catch (error) {
      console.error('Error al cargar el documental:', error);
    } finally {
      this.isLoading = false; // Asegurarse de que isLoading sea false al finalizar
      console.log('DocumentalDetalleComponent: Finalizando loadDocumental. isLoading:', this.isLoading, 'documental:', !!this.documental);
    }
  }

  volver(): void {
    this.location.back();
  }
}