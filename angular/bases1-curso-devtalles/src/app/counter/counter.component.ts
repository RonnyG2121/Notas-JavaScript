import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
// Usando señales
  // Las señales no son más que funciones que almacenan un valor. Se usan para detectar los cambios de estado o información en un componente.
  countSignal = signal(0);
  count: number = 0;

  incrementCounterSignal() {
    this.countSignal.update((value):number => {
      return value += 1;
    })
  }

  decrementCounterSignal() {
    this.countSignal.update((value: number) => {
      return value -=1;
    });
  }

  resetCounterSignal() {
    this.countSignal.set(0);
  }

  // Forma tradicional
  incrementCounter(): number {
    this.count += 1;
    return this.count;
  }
  
  decrementCounter(): number {
    if (this.count !== 0) {
      this.count-=1;
      
    }
    return this.count;
  }
  resetCounter(): void {
    if (this.count !==0) {
      this.count = 0;
      
    }
  }

}
