import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SesionService } from 'src/app/global/services/sesion.service';
import { ObservablesService } from './observables.service';
import { AlertsService } from 'src/app/global/services/alerts.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private sesionService:SesionService,private observables:ObservablesService,private alerts:AlertsService,private router:Router) { }

  tokenError(){
    const token = localStorage.getItem('token');
    const sesion = localStorage.getItem('isLoged');

    if(token || sesion){
    this.sesionService.expiredSession(); 
    }
  }

  rolError(){
  this.observables.isAuthorizated$.emit(true);

   const config={
    message:'No autorizado',
    timmer:1200  
    }

    const reload = () => {
    localStorage.removeItem('rol');
    this.router.navigate(['/admin/choferes']);
    }

   this.alerts.errorTimerFunction(config,reload);
  }

  serverError(){
    const token = localStorage.getItem('token');
    const sesion = localStorage.getItem('isLoged');

    if(token || sesion){
      this.observables.serverError$.emit(true);
      this.observables.errorString$.emit('serverError')
      this.alerts.genericShowError();
    }
  
  }

  notFoundedError(){
  this.observables.notFoundedError$.emit(true);  
  this.observables.errorString$.emit('notFoundedError');
  }

  notUpdatedError(){
  this.alerts.genericShowError();
  }

  checkError(err:HttpErrorResponse){
  switch (err.error.typeError) {
    case 'token':
      this.tokenError();
    break;
    case 'rol':
      this.rolError();
    break;

    case 'notFounded':
    this.notFoundedError();
    break;

    case 'notUpdated':
    this.notUpdatedError();
    break;
  
    default:
    this.serverError();
    break;
  } 
  }

}
