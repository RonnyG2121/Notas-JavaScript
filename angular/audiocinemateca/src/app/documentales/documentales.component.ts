import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginacionComponent } from '../paginacion/paginacion.component';

@Component({
  selector: 'app-documentales',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginacionComponent],
  templateUrl: './documentales.component.html',
  styleUrl: './documentales.component.css'
})
export class DocumentalesComponent implements OnChanges {
  @Input() documentales: any[] = [];
  paginatedDocumentales: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentales']) {
      this.currentPage = 1;
      this.updatePaginatedDocumentales();
    }
  }

  updatePaginatedDocumentales(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDocumentales = this.documentales.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedDocumentales();
  }
}
