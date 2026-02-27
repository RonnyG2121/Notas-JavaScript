import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  imports: [
MenuComponent

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  titulo = "Mi app Angular";
}
