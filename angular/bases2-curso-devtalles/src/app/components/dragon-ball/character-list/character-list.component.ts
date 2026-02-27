import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Character } from '@appinterfaces/character';

@Component({
  selector: 'dragon-ball-character-list',
  imports: [
    NgClass
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
characters = input.required<Character[]>();
listNames = input.required<string>();

}
