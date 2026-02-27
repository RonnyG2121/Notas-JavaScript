import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [
    CommonModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  name = signal("Ironman");
  age = signal(45);
  // Usando los computed Signals
// Estos no son más que signals pero de solo lectura, que dependen de otro signal para actualizar los cambios en el componente
description = computed(() => {
  return `Me llamo ${this.name()} y tengo ${this.age()} años.`;
});

  changeHero() {
    this.name.update((name) => {
      name = "Spiderman";
      return name;
    });

    this.age.update((age) => {
      age = 22;
      return age;
    });
  }

  resetData() {
    this.name.set("Ironman");
    this.age.set(45);

  }

  changeAge() {
    this.age.update((ageChanged) => {
      ageChanged = 60;
      return ageChanged;
    });
  }

  

}