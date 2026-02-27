import { Routes } from '@angular/router';
import { NotFoundComponent } from '@appnot-found/not-found.component';
import { CounterComponent } from '@apppages/counter/counter.component';
import { DragonBallSuperComponent } from '@apppages/dragon-ball-super/dragon-ball-super.component';
import { DragonBallComponent } from '@apppages/dragon-ball/dragon-ball.component';
import { HeroComponent } from '@apppages/hero/hero.component';

export const routes: Routes = [
    {path: "", component: CounterComponent},
    {path: "pages",
        children: [
            {path: "hero", component: HeroComponent},
            {path: "dragon-ball", component: DragonBallComponent},
            {path: "dragon-ball-super", component: DragonBallSuperComponent}
        ]
    },
    {path: "**", component: NotFoundComponent}
];
