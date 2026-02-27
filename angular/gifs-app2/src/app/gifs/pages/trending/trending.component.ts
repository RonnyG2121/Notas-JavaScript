import { Component, computed, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GifsListComponent } from '@appgifs/components/gifs-list/gifs-list.component';
import { GifData, GifItem, GifResponse } from '@appgifs/interfaces/gifs.interface';
import { GifsImageService } from '@appgifs/services/gifs-image.service';
import { ScrollStateService } from '@appgifs/services/scroll-state.service';

@Component({
  selector: 'app-trending',
  imports: [GifsListComponent, RouterLink],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export default class TrendingComponent {
  images = computed(() => {
    this.imageURLS.gifs();
  });
  constructor(public imageURLS: GifsImageService,
    public scrollState: ScrollStateService) { }

  groupDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const divCscrolleable = this.groupDivRef()?.nativeElement;
    if (!divCscrolleable) return;
    const scrollTop = divCscrolleable.scrollTop;
    const clientHeight = divCscrolleable.clientHeight;
    const scrollHeight = divCscrolleable.scrollHeight;
    divCscrolleable.scrollTop = this.scrollState.trendingScrollState();


  }

  manageScroll(event: Event) {

    const divCscrolleable = this.groupDivRef()?.nativeElement;
    if (!divCscrolleable) return;
    const scrollTop = divCscrolleable.scrollTop;
    const clientHeight = divCscrolleable.clientHeight;
    const scrollHeight = divCscrolleable.scrollHeight;
    // console.info(`Se ha hecho scroll. scroll Top: ${scrollTop}. ClientHeight: ${clientHeight}. scrollHeight: ${scrollHeight}.`);

    const scrollEndElement = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollState.trendingScrollState.set(scrollTop);

    if (scrollEndElement) {
      this.imageURLS.getTrendingGifs();
    }

  }


}