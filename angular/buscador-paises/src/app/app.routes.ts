import { Routes } from '@angular/router';
import HomePageComponent from '@apppaises/pages/home-page/home-page.component';

export const routes: Routes = [
    {path: "", component: HomePageComponent},
    {path: "paises", loadChildren: ()=> import('@apppaises/routes/paises.routes')},
    {path: "**", redirectTo: ""}
];
