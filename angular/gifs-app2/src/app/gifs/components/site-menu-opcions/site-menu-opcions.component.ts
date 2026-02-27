import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuOptions } from '@appgifs/interfaces/menu-options';
import { GifsImageService } from '@appgifs/services/gifs-image.service';

@Component({
  selector: 'site-menu-opcions',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './site-menu-opcions.component.html',
  styleUrl: './site-menu-opcions.component.css'
})
export class SiteMenuOpcionsComponent {
  constructor(public gifsService: GifsImageService) {}
  menuOptions: MenuOptions[] = [
    {
      route: "/dashboard/trending",
      label: "Trending",
      sublabel: "Gifs en tendencia",
      icon: "fa-solid fa-chart-line",
    },
        {
          route: "/dashboard/search",
      label: "Buscar",
      sublabel: "Búsquedas de gifs",
      icon: "fa-solid fa-magnifying-glass"
    }
  ];

  
}

