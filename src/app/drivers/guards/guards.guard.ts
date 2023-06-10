import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GuardsGuard implements CanActivateChild {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = localStorage.getItem('token');
      const isLoged = localStorage.getItem('isLoged')
      const rol = localStorage.getItem('rol');
      const roles = ['user','moderator','admin'];
      let exists = false;

      if(token || isLoged){
        if(!rol){
         return false
       }else{
         roles.forEach(rolArray => {
           if(rol === rolArray){
           exists = true;
           }  
           })
         
           if(!exists){
             return false
           }else{
            if(rol === 'admin'){
             return true
            }else{
            return false
            }
           }
       }
      }else{
    return true;
      }
  }
  
}
