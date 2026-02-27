import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtro-catalogo.component.html',
  styleUrls: ['./filtro-catalogo.component.css']
})
export class FiltroCatalogoComponent {
  @Input() generos: { name: string, count: number }[] = [];
  @Input() ordenSeleccionado: string = 'default';
  @Input() generoSeleccionado: string = 'todos';
  @Input() activeTab: string = 'peliculas';
  @Input() peliculasMap: Map<string, any> = new Map();
  @Input() seriesMap: Map<string, any> = new Map();
  @Input() cortometrajesMap: Map<string, any> = new Map();
  @Input() documentalesMap: Map<string, any> = new Map();
  @Output() ordenChange = new EventEmitter<string>();
  @Output() generoChange = new EventEmitter<string>();

  constructor(private router: Router) {}

  onOrdenChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.ordenChange.emit(selectElement.value);
  }

  onGeneroChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.generoChange.emit(selectElement.value);
  }

  get randomButtonText(): string {
    switch (this.activeTab) {
      case 'peliculas':
        return 'Película Aleatoria';
      case 'series':
        return 'Serie Aleatoria';
      case 'cortometrajes':
        return 'Cortometraje Aleatorio';
      case 'documentales':
        return 'Documental Aleatorio';
      default:
        return 'Aleatorio';
    }
  }

  irAElementoAleatorio(): void {
    let map: Map<string, any> | undefined;
    let routePath: string = '';

    switch (this.activeTab) {
      case 'peliculas':
        map = this.peliculasMap;
        routePath = '/peliculas';
        break;
      case 'series':
        map = this.seriesMap;
        routePath = '/series';
        break;
      case 'cortometrajes':
        map = this.cortometrajesMap;
        routePath = '/cortometrajes';
        break;
      case 'documentales':
        map = this.documentalesMap;
        routePath = '/documentales';
        break;
    }

    if (map && map.size > 0) {
      const keys = Array.from(map.keys());
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      this.router.navigate([routePath, randomKey]);
    }
  }
}
