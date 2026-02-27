import { Routes } from "@angular/router";
import PaisesLayoutComponent from "@apppaises/components/layouts/paises-layout/paises-layout.component";
import CapitalesComponent from "@apppaises/pages/capitales/capitales.component";

const countryRoutes: Routes = [
{path: "", component: PaisesLayoutComponent,
    children: [
        {path: "capital", component: CapitalesComponent},
        {path: "**", redirectTo: "capital"}
    ]
}
]

export default  countryRoutes;