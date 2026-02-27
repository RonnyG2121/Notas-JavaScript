import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifsImageService } from '@appgifs/services/gifs-image.service';
import { GifsListComponent } from '@appgifs/components/gifs-list/gifs-list.component';


@Component({
  selector: 'app-gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
  styleUrl: './gif-history.component.css'
})
export default class GifHistoryComponent {
  gifService = inject(GifsImageService);

  query = toSignal(
    inject(
      ActivatedRoute).params
      .pipe(
        map((params) => params['query']))
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });

  deleteHistory() {
    if (localStorage.getItem('gifs')) {
      localStorage.removeItem('gifs');
      
    }
  }
}
