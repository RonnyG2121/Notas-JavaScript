import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 20;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  totalPages: number = 0;
  pages: (number | string)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PaginacionComponent ngOnChanges:', { 
      totalItems: this.totalItems,
      currentPage: this.currentPage 
    });
    this.calculatePages();
  }

  calculatePages(): void {
    if (!this.totalItems || this.totalItems <= this.itemsPerPage) {
      this.totalPages = 1;
      this.pages = [1];
      return;
    }

    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    const pages = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (this.currentPage > halfPagesToShow + 2) {
        pages.push('...');
      }

      let startPage = Math.max(2, this.currentPage - halfPagesToShow);
      let endPage = Math.min(this.totalPages - 1, this.currentPage + halfPagesToShow);

      if (this.currentPage <= halfPagesToShow + 1) {
        endPage = maxPagesToShow -1;
      }

      if (this.currentPage >= this.totalPages - halfPagesToShow) {
        startPage = this.totalPages - maxPagesToShow + 2;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (this.currentPage < this.totalPages - halfPagesToShow - 1) {
        pages.push('...');
      }
      pages.push(this.totalPages);
    }
    this.pages = pages;
  }

  changePage(page: number | string): void {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}