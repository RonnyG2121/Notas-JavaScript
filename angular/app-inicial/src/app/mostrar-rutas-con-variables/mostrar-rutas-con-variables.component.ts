import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-rutas-con-variables',
  imports: [FormsModule],
  templateUrl: './mostrar-rutas-con-variables.component.html',
  styleUrl: './mostrar-rutas-con-variables.component.css'
})
export class MostrarRutasConVariablesComponent {
  constructor(private root: ActivatedRoute) {}

  saludo: string = "";

  ngOnInit() {
    this.saludo = this.root.snapshot.queryParams['saludo'];
  }

}