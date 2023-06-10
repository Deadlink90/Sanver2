import { EventEmitter, Injectable } from '@angular/core';

interface user {
  username:string,
  rol:string 
 }
 
@Injectable({
  providedIn: 'root'
})



export class ObservablesService {

  userLoged$ = new EventEmitter<boolean>();
  userInfo$ = new EventEmitter<user>();

  constructor() { }
}
