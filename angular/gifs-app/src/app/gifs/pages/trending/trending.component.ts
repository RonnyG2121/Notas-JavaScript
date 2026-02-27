import { Component, computed } from '@angular/core';
import { GifsListComponent } from '@appgifs/components/gifs-list/gifs-list.component';
import { GifData, GifItem, GifResponse } from '@appgifs/interfaces/gifs.interface';
import { GifsImageService } from '@appgifs/services/gifs-image.service';

@Component({
  selector: 'app-trending',
  imports: [GifsListComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export default class TrendingComponent {
  images = computed(() => {
    this.imageURLS.gifs();
  });
  constructor(public imageURLS: GifsImageService) {
    this.imageURLS.getTrendingGifs();
  }

/*   ngOnInit() {

  }
 */
}