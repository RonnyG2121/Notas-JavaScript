import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppService } from './app.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  const appService = inject(AppService);
  const router = inject(Router);

  return appService.autoLogin().pipe(
    map(result => {
      // Caso 1: El usuario está logueado
      if (result.loggedIn) {
        // Si el usuario logueado intenta ir a /login, redirigir a /catalogo
        if (state.url === '/login') {
          return router.parseUrl('/catalogo');
        }
        // Si se requiere actualización, redirigir a /inicio
        if (result.updateRequired) {
          return router.parseUrl('/inicio');
        }
        // Usuario logueado y no requiere actualización, permitir acceso
        return true;
      } 
      // Caso 2: El usuario NO está logueado
      else {
        // Si el usuario no logueado intenta ir a /login, permitir acceso
        if (state.url === '/login') {
          return true;
        }
        // Si el usuario no logueado intenta ir a una ruta protegida, redirigir a /login
        return router.parseUrl('/login');
      }
    }),
    catchError(error => {
      // En caso de cualquier error durante autoLogin, redirigir a /login
      console.error('AuthGuard error durante autoLogin:', error);
      return of(router.parseUrl('/login'));
    })
  );
};
