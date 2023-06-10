import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ObservablesService } from '../services/observables.service';
import { SesionService } from '../services/sesion.service';

@Injectable({
  providedIn: 'root'
})

export class TestGuard implements CanLoad {
  constructor(private authService: AuthService,private router:Router, private observabables:ObservablesService,private sessionService:SesionService) {}

  checkToken() {
    let token = localStorage.getItem('token');
    let isLogedLocal = localStorage.getItem('isLoged');
    let username = localStorage.getItem('username');
    let rol = localStorage.getItem('rol');

    if (!token) {
      if(isLogedLocal) localStorage.removeItem('isLoged');
      if(username) localStorage.removeItem('username');
      if(rol) localStorage.removeItem('rol');
      this.observabables.userLoged$.emit(false);
      this.router.navigate(['/auth'])
      return false;
    }

    this.authService.checkToken().subscribe(
      res => {
     if(res.status === 'false'){
      localStorage.removeItem('token');
      if(isLogedLocal) localStorage.removeItem('isLoged');
      if(username) localStorage.removeItem('username');
      if(rol) localStorage.removeItem('rol');
       
     this.observabables.userLoged$.emit(false);
     this.router.navigate(['/auth']);
     return false
     }else{
      if(!isLogedLocal || isLogedLocal !== 'true') localStorage.setItem('isLoged','true')
      localStorage.setItem('username',res.username);
      localStorage.setItem('rol',res.rol);
      this.observabables.userLoged$.emit(true);
     return true 
     }   
      },
      err =>{
      // console.log('Token invalido')
      if(isLogedLocal) localStorage.removeItem('isLoged');
      localStorage.removeItem('token'); 
      if(username) localStorage.removeItem('username');
      if(rol) localStorage.removeItem('rol');
      this.observabables.userLoged$.emit(false);
      this.router.navigate(['/auth'])
      return false  
      }
    )

    return true

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkToken();
  }
}
