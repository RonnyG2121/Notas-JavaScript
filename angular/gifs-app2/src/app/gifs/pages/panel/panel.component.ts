import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteMenuHeaderComponent } from '@appgifs/components/site-menu-header/site-menu-header.component';
import { SiteMenuOpcionsComponent } from '@appgifs/components/site-menu-opcions/site-menu-opcions.component';

@Component({
  selector: 'app-panel',
  imports: [RouterOutlet,
    SiteMenuHeaderComponent,
    SiteMenuOpcionsComponent
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export default class PanelComponent {

}