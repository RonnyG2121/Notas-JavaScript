import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resultado',
  imports: [],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.css'
})
export class ResultadoComponent {
  @Input()
  resultadoEnviado: number = 0;

}
