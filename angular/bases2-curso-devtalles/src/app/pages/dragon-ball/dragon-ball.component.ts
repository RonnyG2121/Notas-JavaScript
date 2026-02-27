import { Component, signal } from '@angular/core';
import { Charapter } from './interfaces/charapter';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dragon-ball',
  imports: [NgClass],
  templateUrl: './dragon-ball.component.html',
  styleUrl: './dragon-ball.component.css'
})
export class DragonBallComponent {
  charapters = signal<Charapter[]>([
    { id: 1, name: "Goku", power: 10000 },
    { id: 2, name: "Vegeta", power: 9500 },
    { id: 3, name: "Pikolo", power: 7000 },
    {id: 4, name: "Yamcha", power: 500}
  ]);

    name= signal<string>("");
power = signal<number>(0);
 
  addCharapter() {
    // event?.preventDefault();
    console.log(`${this.name()}, ${this.power()}`);
    if (!this.name() || !this.power() || this.power() <=0) {
      return;
    }

    const newCharapter: Charapter = {
      id: this.charapters().length+1,
      name: this.name(),
      power: this.power()
    };

            this.charapters.update((charapterList) => {
              return [...charapterList, newCharapter];
            });

  }

}