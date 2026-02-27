import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'audiocinemateca';

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.checkInitialNavigation();
  }

  private checkInitialNavigation(): void {
    this.appService.autoLogin().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.appService.loadCatalog().subscribe({
          next: () => {
            this.router.navigate(['/catalogo']);
          },
          error: () => {
            this.router.navigate(['/inicio']); // Go to downloader if catalog load fails
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}

