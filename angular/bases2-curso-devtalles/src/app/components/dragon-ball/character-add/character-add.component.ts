import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Character } from '@appinterfaces/character';

@Component({
  selector: 'character-add',
  imports: [],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.css'
})
export class CharacterAddComponent {
    name = signal<string>("");
  power = signal<number>(0);
  @Output()
 newCharapter = new EventEmitter;

    sendData() {
      
      if (!this.name() || this.power() <=0) {
        return;
      }
        const character:Character = {
          id: Math.floor(Math.random()*100) +1,
          name: this.name(),
          power: this.power()
        }
      this.newCharapter.emit(character);
      console.log(character);

      this.name.set("");
      this.power.set(0);
    }

}