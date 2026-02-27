import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
usuarios:any[] = [];
  constructor(private usuariosService: UsuariosService) {}
  
  ngOnInit(): void {
    this.usuariosService.getUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }
  
}