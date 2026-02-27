import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexedDbService } from '../indexed-db.service';
import { PeliculasComponent } from '../peliculas/peliculas.component';
import { SeriesComponent } from '../series/series.component';
import { CortometrajesComponent } from '../cortometrajes/cortometrajes.component';
import { DocumentalesComponent } from '../documentales/documentales.component';
import { FiltroCatalogoComponent } from '../filtro-catalogo/filtro-catalogo.component';
import { Subject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, PeliculasComponent, SeriesComponent, CortometrajesComponent, DocumentalesComponent, FiltroCatalogoComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit, OnDestroy {
  catalog: any | null = null;
  selectedCategory: string = 'peliculas';

  // Maps para almacenar los elementos por ID para búsqueda rápida
  originalPeliculasMap: Map<string, any> = new Map();
  originalSeriesMap: Map<string, any> = new Map();
  originalCortometrajesMap: Map<string, any> = new Map();
  originalDocumentalesMap: Map<string, any> = new Map();

  // Arrays para mostrar, estos se generan a partir de los Maps y se filtran/ordenan
  allPeliculas: any[] = [];
  allSeries: any[] = [];
  allCortometrajes: any[] = [];
  allDocumentales: any[] = [];

  uniqueGenres: { name: string, count: number }[] = [];
  currentOrden: string = 'default';
  currentGenero: string = 'todos';
  searchTerm: string = '';

  private searchTermChanged: Subject<string> = new Subject<string>();
  private subscriptions: Subscription = new Subscription();

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnInit(): void {
    this.loadCatalogFromDb();

    this.subscriptions.add(this.searchTermChanged.pipe(
      debounceTime(300), // Espera 300ms después de la última pulsación
      distinctUntilChanged() // Solo emite si el valor actual es diferente al último
    ).subscribe(() => {
      this.applyFilters();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async loadCatalogFromDb(): Promise<void> {
    try {
      const storedCatalog = await this.indexedDbService.getCatalog();
      if (storedCatalog) {
        this.catalog = storedCatalog.data;

        if (this.catalog.series) {
          this.catalog.series.forEach((serie: any) => {
            if (serie.capitulos && typeof serie.capitulos === 'object') {
              serie.capitulos = Object.keys(serie.capitulos).map(key => serie.capitulos[key][0]);
            }
          });
        }

        // Convertir arrays a Maps para búsqueda rápida
        this.originalPeliculasMap = new Map((this.catalog.peliculas || []).map((p: any) => [p.id, p]));
        this.originalSeriesMap = new Map((this.catalog.series || []).map((s: any) => [s.id, s]));
        this.originalCortometrajesMap = new Map((this.catalog.cortometrajes || []).map((c: any) => [c.id, c]));
        this.originalDocumentalesMap = new Map((this.catalog.documentales || []).map((d: any) => [d.id, d]));

        // Generar géneros para la categoría inicial (películas) a partir de los valores del Map
        this.generateUniqueGenres(Array.from(this.originalPeliculasMap.values()));
        this.applyFilters();
      } else {
        // console.warn('No se encontró catálogo en IndexedDB.');
      }
    } catch (error) {
      // console.error('Error al cargar el catálogo desde IndexedDB:', error);
    }
  }

  generateUniqueGenres(items: any[]): void {
    const genreCounts = new Map<string, number>();

    items.forEach(item => {
      if (item.genero && typeof item.genero === 'string') {
        item.genero.split('.').forEach((g: string) => {
          const trimmedGenre = g.trim();
          if (trimmedGenre) {
            genreCounts.set(trimmedGenre, (genreCounts.get(trimmedGenre) || 0) + 1);
          }
        });
      }
    });

    this.uniqueGenres = Array.from(genreCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentOrden = 'default'; // Resetear orden al cambiar de categoría
    this.currentGenero = 'todos'; // Resetear género al cambiar de categoría
    this.searchTerm = ''; // Resetear término de búsqueda al cambiar de categoría

    // Generar géneros para la nueva categoría seleccionada a partir de los valores del Map
    switch (category) {
      case 'peliculas':
        this.generateUniqueGenres(Array.from(this.originalPeliculasMap.values()));
        break;
      case 'series':
        this.generateUniqueGenres(Array.from(this.originalSeriesMap.values()));
        break;
      case 'cortometrajes':
        this.generateUniqueGenres(Array.from(this.originalCortometrajesMap.values()));
        break;
      case 'documentales':
        this.generateUniqueGenres(Array.from(this.originalDocumentalesMap.values()));
        break;
    }
    this.applyFilters();
  }

  onOrdenChange(orden: string): void {
    this.currentOrden = orden;
    this.applyFilters();
  }

  onGeneroChange(genero: string): void {
    this.currentGenero = genero;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.searchTermChanged.next(this.searchTerm);
  }

  applyFilters(): void {
    // Obtener los valores de los Maps para filtrar y ordenar
    let peliculas = Array.from(this.originalPeliculasMap.values());
    let series = Array.from(this.originalSeriesMap.values());
    let cortometrajes = Array.from(this.originalCortometrajesMap.values());
    let documentales = Array.from(this.originalDocumentalesMap.values());

    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    // Aplicar búsqueda
    if (lowerCaseSearchTerm) {
      const searchFn = (item: any) => {
        const title = (item.Titulo || item.titulo || '').toLowerCase();
        const sinopsis = (item.sinopsis || '').toLowerCase();
        return title.includes(lowerCaseSearchTerm) || sinopsis.includes(lowerCaseSearchTerm);
      };
      peliculas = peliculas.filter(searchFn);
      series = series.filter(searchFn);
      cortometrajes = cortometrajes.filter(searchFn);
      documentales = documentales.filter(searchFn);
    }

    // Filtrar por género
    if (this.currentGenero && this.currentGenero !== 'todos') {
      const filterFn = (item: any) => item.genero && item.genero.split('.').map((g: string) => g.trim()).includes(this.currentGenero);
      peliculas = peliculas.filter(filterFn);
      series = series.filter(filterFn);
      cortometrajes = cortometrajes.filter(filterFn);
      documentales = documentales.filter(filterFn);
    }

    // Ordenar
    if (this.currentOrden && this.currentOrden !== 'default') {
      const sortFn = (a: any, b: any) => {
        const titleA = a.Titulo || a.titulo;
        const titleB = b.Titulo || b.titulo;
        if (!titleA || !titleB) return 0;
        return this.currentOrden === 'alfabetico_asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      };
      peliculas.sort(sortFn);
      series.sort(sortFn);
      cortometrajes.sort(sortFn);
      documentales.sort(sortFn);
    }

    this.allPeliculas = peliculas;
    this.allSeries = series;
    this.allCortometrajes = cortometrajes;
    this.allDocumentales = documentales;
  }
}