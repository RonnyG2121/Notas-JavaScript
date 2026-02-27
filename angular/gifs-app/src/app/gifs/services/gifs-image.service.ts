import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { GifItem, GifData, GifResponse } from '@appgifs/interfaces/gifs.interface';
import { GifMapper } from '@appgifs/mappers/gif.mapper';
import { environment } from 'environments/environment.development';
import { map, Observable, tap } from 'rxjs';
// import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const loadGifsFronLocalStorage = () => {
  const gifsInLocalStorage = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse(gifsInLocalStorage);
  return gifs;
}

@Injectable({
  providedIn: 'root'
})
export class GifsImageService {
  constructor(private httpClient: HttpClient) {
    // this.getTrendingGifs();
  }

  gifs = signal<GifItem[]>([]);
  gifsIsLoading = signal(true);
  searchHistory = signal<Record<string, GifItem[]>>(loadGifsFronLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveGifsInLocalStorage = effect(() => {
    const gifsHistories = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', gifsHistories);
  });

  getTrendingGifs(): void {
    this.httpClient.get<GifResponse>(`${environment.gipthyURL}${environment.trendingEndPoint}`,
      {
        params: {
          api_key: environment.giphyApi,
          limit: 25,
          offset: 0,
          rating: "g"
        }
      })
      .subscribe((res) => {
        const gifs = GifMapper.gifItemReseivedArray(res.data);
        this.gifs.set(gifs);
        this.gifsIsLoading.set(false);
      });
  }



  searchGifs(query: string): Observable<GifItem[]> {
    return this.httpClient
      .get<GifResponse>(`${environment.gipthyURL}${environment.searchEndPoint}`,
        {
          params: {
            api_key: environment.giphyApi,
            limit: 20,
            q: query,
            offset: 0,
            rating: "g",
            lang: "es"
          }
        })
      .pipe(
        map(({ data }) => GifMapper.gifItemReseivedArray(data)),
        tap((histories) => {
          this.searchHistory.update((history) => {
            return ({
              ...history,
              [query.toLowerCase()]: histories,
            })
          })
        })
      );


  }

  getHistoryGifs(query: string): GifItem[] {
    return this.searchHistory()[query] ?? [];
  }
}