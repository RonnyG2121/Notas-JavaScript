import { Component, input, Input } from '@angular/core';
import { GifItem } from '@appgifs/interfaces/gifs.interface';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  styleUrl: './gifs-list-item.component.css'
})
export class GifsListItemComponent {
  // @Input()
  imageFromList = input.required<GifItem>();
  

}