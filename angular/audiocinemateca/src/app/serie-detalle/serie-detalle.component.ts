import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IndexedDbService } from '../indexed-db.service';

@Component({
  selector: 'app-serie-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './serie-detalle.component.html',
  styleUrl: './serie-detalle.component.css'
})
export class SerieDetalleComponent implements OnInit {
  serie: any = null;
  videoUrlActual: string = '';
  temporadaSeleccionada: number | null = null;
  capitulosTemporadaActual: any[] = [];
  isLoading: boolean = true; // Añadir estado de carga

  constructor(
    private route: ActivatedRoute,
    private indexedDbService: IndexedDbService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('SerieDetalleComponent: ID recibido de la URL (ngOnInit):', id, 'Tipo:', typeof id);
    if (id) {
      this.loadSerie(id);
    } else {
      this.isLoading = false; // No hay ID, no hay carga
    }
  }

  async loadSerie(id: string): Promise<void> {
    console.log('SerieDetalleComponent: Iniciando loadSerie para ID:', id);
    this.isLoading = true; // Iniciar carga
    try {
      const catalog = await this.indexedDbService.getCatalog();
      if (catalog && catalog.seriesMap) {
        console.log('SerieDetalleComponent: Catálogo de series cargado. Intentando obtener serie con ID:', id);
        const foundSerie = catalog.seriesMap.get(id);
        console.log('SerieDetalleComponent: Resultado de seriesMap.get(id):', foundSerie);
        this.serie = foundSerie;
          
        if (this.serie) {
          console.log('SerieDetalleComponent: Serie encontrada y asignada:', this.serie);
          // Inicializar la primera temporada y sus capítulos
          const temporadas = this.getTemporadas();
          if (temporadas.length > 0) {
            this.seleccionarTemporada(temporadas[0]);
          }
        } else {
          console.warn('SerieDetalleComponent: Serie NO encontrada para ID:', id);
        }
      }
    } catch (error) {
      console.error('Error al cargar la serie:', error);
    } finally {
      this.isLoading = false; // Asegurarse de que isLoading sea false al finalizar
      console.log('SerieDetalleComponent: Finalizando loadSerie. isLoading:', this.isLoading, 'serie:', !!this.serie);
    }
  }

  getTemporadas(): number[] {
    if (!this.serie || !this.serie.capitulos) {
      return [];
    }
    // Asumiendo que serie.capitulos es un objeto donde las claves son los números de temporada
    return Object.keys(this.serie.capitulos).map(Number).sort((a, b) => a - b);
  }

  seleccionarTemporada(temporadaNum: number): void {
    this.temporadaSeleccionada = temporadaNum;
    if (this.serie && this.serie.capitulos && this.serie.capitulos[temporadaNum]) {
      // Asegurarse de que los capítulos de la temporada sean un array
      this.capitulosTemporadaActual = this.serie.capitulos[temporadaNum];
      // Seleccionar el primer capítulo de la temporada si existe
      if (this.capitulosTemporadaActual.length > 0) {
        this.videoUrlActual = this.capitulosTemporadaActual[0].enlace;
      }
    } else {
      this.capitulosTemporadaActual = [];
      this.videoUrlActual = '';
    }
  }

  seleccionarCapitulo(capitulo: any): void {
    this.videoUrlActual = capitulo.enlace;
  }

  volver(): void {
    this.location.back();
  }
}