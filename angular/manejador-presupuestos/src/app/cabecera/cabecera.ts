import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { App } from '../app';

@Component({
    selector: 'app-cabecera',
    imports: [CommonModule],
    templateUrl: './cabecera.html',
    styleUrl: './cabecera.css'
})
export class Cabecera {
    @Input()
    presupuestoDisponible!: number;
    @Input()
    porcentaje!: number;
    @Input()
    ingreso!: number;
    @Input()
    egreso!: number;


}