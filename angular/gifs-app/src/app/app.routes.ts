import { Routes } from '@angular/router';
import PanelComponent from '@appgifs/pages/panel/panel.component';

export const routes: Routes = [
    {
        path: "dashboard", component: PanelComponent,
        children: [
                        { path: "history/:query", loadComponent: () => import('@appgifs/pages/gif-history/gif-history.component') },
            { path: "search", loadComponent: () => import('@appgifs/pages/search/search.component') },
            { path: "trending", loadComponent: () => import('@appgifs/pages/trending/trending.component') },
            {path: "**", redirectTo: "trending"}
        ]},
    { path: "**", redirectTo: "dashboard" }

];
