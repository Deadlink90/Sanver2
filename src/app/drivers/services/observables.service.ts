import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() { }

   isAuthorizated$ = new EventEmitter<boolean>();
   serverError$ = new EventEmitter<boolean>();
   notFoundedError$ = new EventEmitter<boolean>();
   reloadPage$ = new EventEmitter<boolean>();

}
