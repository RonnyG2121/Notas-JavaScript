import { Component, Input, input, signal} from '@angular/core';
import { Character } from '@appinterfaces/character';
import { NgClass } from '@angular/common';
import { CharacterListComponent } from "@appcomponents/dragon-ball/character-list/character-list.component";
import { CharacterAddComponent } from '@appcomponents/dragon-ball/character-add/character-add.component';
import { DragonBallService } from '@appservices/dragon-ball.service';

@Component({
  selector: 'app-dragon-ball-super',
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragon-ball-super.component.html',
  styleUrl: './dragon-ball-super.component.css'
})
export class DragonBallSuperComponent {
  constructor(public charactersService: DragonBallService) {}

}