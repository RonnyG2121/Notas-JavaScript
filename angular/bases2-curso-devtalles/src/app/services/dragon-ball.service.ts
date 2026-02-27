import { effect, Injectable, signal } from '@angular/core';
import {Character} from '@appinterfaces/character'

  const loadCharacters = (): Character[] => {
const charactersInLocalStorage = localStorage.getItem('characters');
return charactersInLocalStorage ? JSON.parse(charactersInLocalStorage) : [];
  }

@Injectable({
  providedIn: 'root'
})
export class DragonBallService {

  characters = signal<Character[]>(loadCharacters());
 
  constructor() {
    effect(() => {
      localStorage.setItem('characters', JSON.stringify(this.characters()));
    });

    console.log(`Tienes agregados ${this.characters().length}.`);

  }
  addCharacter(newCharacter: Character) {
    this.characters.update((list) => {
      return [...list, newCharacter]
    });
  }
 
  loadCharacters = (): Character[] => {
const charactersInLocalStorage = localStorage.getItem('characters');
return charactersInLocalStorage ? JSON.parse(charactersInLocalStorage) : [];
  }

}