import { Injectable } from '@angular/core';
import { SesionService } from 'src/app/global/services/sesion.service';
import { ObservablesSetingsService } from './observables-setings.service';
import { AlertsService } from 'src/app/global/services/alerts.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorsSettingsService {
  constructor(
    private sesionService: SesionService,
    private observables: ObservablesSetingsService,
    private alerts:AlertsService,
    private router:Router
  ) {}

  tokenError() {
    const token = localStorage.getItem('token');
    const sesion = localStorage.getItem('isLoged');

    if (token || sesion) {
      this.sesionService.expiredSession();
    }
  }

  rolError() {
    this.observables.isAuthorizated$.emit(true);
    const config = {
      message: 'No autorizado',
      timmer: 1200,
    };

    const reload = () => {
      localStorage.removeItem('rol');
      this.router.navigate(['/admin/ajustes']);
    };

    this.alerts.errorTimerFunction(config, reload);
  }

  serverError() {
    const token = localStorage.getItem('token');
    const sesion = localStorage.getItem('isLoged');

    if (token || sesion) {
      this.observables.serverError$.emit(true);
      this.alerts.genericShowError();
    }
  }

  notUpdatedError(){
  this.alerts.customizedError('Registro no actualizado!!'); 
  }

  notCreateError(){
  this.alerts.customizedError('Error al crear la ruta!!')  
  }

  notFounded(){
  this.observables.notFounded$.emit(true);  
  this.alerts.customizedError('Registro no encontrado!!');
  }

  checkError(err: HttpErrorResponse) {
    switch (err.error.typeError) {
      case 'token':
        this.tokenError();
        break;
        
      case 'rol':
        this.rolError();
        break;

        case 'notUpdated':
        this.notUpdatedError();
        break;

        case 'CreateRuta':
       this.notCreateError();
        break;

        case 'notFounded':
        this.notFounded();
        break;

      default:
        this.serverError();
        break;
    }
  }

}
