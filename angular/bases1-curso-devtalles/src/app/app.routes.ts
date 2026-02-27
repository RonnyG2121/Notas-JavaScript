import { Routes } from '@angular/router';
import { CounterComponent } from '@appcounter/counter.component';
import { HeroComponent } from '@apppages/hero/hero.component';

export const routes: Routes = [
    {path: "", component: CounterComponent},
    {path: "pages",
        children: [
            {path: "hero", component: HeroComponent}
        ]
    }
];
