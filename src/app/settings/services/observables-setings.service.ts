import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObservablesSetingsService {

  constructor() { }

  isAuthorizated$ = new EventEmitter<boolean>();
   serverError$ = new EventEmitter<boolean>();
   reloadPage$ = new EventEmitter<boolean>();
   notUpdate$ = new EventEmitter<boolean>();
   notFounded$ = new EventEmitter<boolean>();
}
