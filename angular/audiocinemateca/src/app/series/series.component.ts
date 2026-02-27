import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginacionComponent } from '../paginacion/paginacion.component';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginacionComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnChanges {
  @Input() series: any[] = [];
  paginatedSeries: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series']) {
      this.currentPage = 1;
      this.updatePaginatedSeries();
    }
  }

  updatePaginatedSeries(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSeries = this.series.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedSeries();
  }
}
