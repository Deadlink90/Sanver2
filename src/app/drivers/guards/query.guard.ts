import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable()
export class QueryGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const queryParams = route.queryParams;
    
    if (Object.keys(queryParams).length > 0) {
      // La URL tiene query params, permitir la activación de la ruta
      return true;
    } else {
      // No hay query params en la URL, bloquear la activación de la ruta
      return false;
    }
  }
}
