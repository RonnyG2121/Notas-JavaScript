import { Component, input, Input, Signal } from '@angular/core';
import { GifsListItemComponent } from "./gifs-list-item/gifs-list-item.component";
import { GifItem } from '@appgifs/interfaces/gifs.interface';

@Component({
  selector: 'gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
  styleUrl: './gifs-list.component.css'
})
export class GifsListComponent {
  // @Input({ required: true })
  imagesFromTrending = input.required<GifItem[]>();

}
