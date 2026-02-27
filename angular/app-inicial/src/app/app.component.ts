import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { SaludoService } from './saludo.service';



@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,

    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private title = 'Mi primera aplicación angular';
  
  // Diferencias entre los geters y get en typescript y javascript
  // Typescript. Al llamarlo, no es necesario incluir los paréntesis y la palabra get está separada del nombre
  get mostrarTitulo() {
    return this.title;
  }
  // Método javascript
  getTiculo() {
    return this.title;
  }

}