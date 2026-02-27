import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { DirectivasComponent } from './directivas/directivas.component';
import { PadreComponent } from './padre/padre.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { MostrarRutasConVariablesComponent } from './mostrar-rutas-con-variables/mostrar-rutas-con-variables.component';
import { HijoComponent } from './hijo/hijo.component';
import { FormularioComponent } from './listado-productos/formulario/formulario.component';

export const routes: Routes = [
    {
        path: '',
        title: "Página principal",
        component: MainComponent
    },
    {
        path: 'servicios',
        title: "Nuestros servicios",
        component: ServiciosComponent
    },
    {path: 'tienda', component: ListadoProductosComponent},
            {path: "agregar", component: FormularioComponent},
            {path: "editar/:id", component: FormularioComponent},
            {path: "eliminar/:id", component: ListadoProductosComponent},
    {path: "calculadora", component: CalculadoraComponent},
    { path: "directivas", component: DirectivasComponent },
    { path: "usuarios", component: ListaUsuariosComponent},
    { path: "saludar", component: MostrarRutasConVariablesComponent},
    {path: "rutas-hijas",
        children: [
            {path: "padre", component: PadreComponent},
            {path: "hijo", component: HijoComponent}
        ]

    }

];
