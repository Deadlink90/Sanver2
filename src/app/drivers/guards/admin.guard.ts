import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    const isLoged = localStorage.getItem('isLoged');
    const rol = localStorage.getItem('rol');
    const roles = ['user', 'moderator', 'admin'];
    let exists = false;

    if (token || isLoged) {
      if (!rol) {
        this.router.navigate(['/admin/choferes']);
        return false;
      } else {
        roles.forEach((rolArray) => {
          if (rol === rolArray) {
            exists = true;
          }
        });

        if (!exists) {
          localStorage.removeItem('rol');
          this.router.navigate(['/admin/choferes']);
          return false;
        } else {
          if (rol === 'admin') {
            return true;
          } else {
            this.router.navigate(['/admin/choferes']);
            return false;
          }
        }
      }
    } else {
      return true;
    }
  }
}
