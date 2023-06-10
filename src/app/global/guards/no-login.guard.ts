import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanLoad {

  constructor (private router:Router) {}

  get isLogged(){
  let isLogedLocal = localStorage.getItem('isLoged');
  let token = localStorage.getItem('token');

  if(isLogedLocal || token){
  let isLogedLocalBoolean= true; 
  this.router.navigate(['/admin'])
  return isLogedLocalBoolean === true ? false : true;
  }else{
  return true;  
  }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLogged;
  }
}
