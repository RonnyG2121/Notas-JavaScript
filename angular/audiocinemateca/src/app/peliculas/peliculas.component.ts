import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginacionComponent } from '../paginacion/paginacion.component';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginacionComponent],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnChanges {
  @Input() peliculas: any[] = [];
  paginatedPeliculas: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['peliculas']) {
      this.currentPage = 1;
      this.updatePaginatedPeliculas();
    }
  }

  updatePaginatedPeliculas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPeliculas = this.peliculas.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedPeliculas();
  }
}
