import { Component, computed, signal } from '@angular/core';
import { GifsListComponent } from "@appgifs/components/gifs-list/gifs-list.component";
import { GifItem } from '@appgifs/interfaces/gifs.interface';
import { GifsImageService } from '@appgifs/services/gifs-image.service';

@Component({
  selector: 'app-search',
  imports: [GifsListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export default class SearchComponent {
  /*   gifsSearch = computed(() => {
      this.gifsImageService.gifs();
    });
   */

    gifsSearch = signal<GifItem[]>([]);

  constructor(public gifsImageService: GifsImageService) {
    // console.info(this.gifsSearch());

  }

  goToSearch(query: string) {
        this.gifsImageService.searchGifs(query).subscribe((resp) => {
          this.gifsSearch.set(resp);
          // console.info(resp);
        })

    // console.info(`Palabra a buscar: ${query}`);
  }

}
