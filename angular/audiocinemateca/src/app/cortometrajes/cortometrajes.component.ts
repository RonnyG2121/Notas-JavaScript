import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginacionComponent } from '../paginacion/paginacion.component';

@Component({
  selector: 'app-cortometrajes',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginacionComponent],
  templateUrl: './cortometrajes.component.html',
  styleUrl: './cortometrajes.component.css'
})
export class CortometrajesComponent implements OnChanges {
  @Input() cortometrajes: any[] = [];
  paginatedCortometrajes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cortometrajes']) {
      this.currentPage = 1;
      this.updatePaginatedCortometrajes();
    }
  }

  updatePaginatedCortometrajes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCortometrajes = this.cortometrajes.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedCortometrajes();
  }
}
