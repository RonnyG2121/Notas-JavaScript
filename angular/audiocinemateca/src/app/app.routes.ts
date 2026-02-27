import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { authGuard } from './auth.guard';
import { PeliculaDetalleComponent } from './pelicula-detalle/pelicula-detalle.component';
import { SerieDetalleComponent } from './serie-detalle/serie-detalle.component';
import { DocumentalDetalleComponent } from './documental-detalle/documental-detalle.component';
import { CortometrajeDetalleComponent } from './cortometraje-detalle/cortometraje-detalle.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [authGuard] },
  { path: 'peliculas/:id', component: PeliculaDetalleComponent, canActivate: [authGuard] },
  { path: 'series/:id', component: SerieDetalleComponent, canActivate: [authGuard] },
  { path: 'documentales/:id', component: DocumentalDetalleComponent, canActivate: [authGuard] },
  { path: 'cortometrajes/:id', component: CortometrajeDetalleComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' }, // Redirige a catálogo por defecto si está logueado
  // Agrega aquí otras rutas de tu aplicación
];
