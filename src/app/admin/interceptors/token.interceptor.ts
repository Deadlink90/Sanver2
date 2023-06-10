import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  let token = localStorage.getItem('token');

  if(token){ 
    //si existe un token, colocarlo en la cabezera
    const headers = new HttpHeaders({ 
     'x-access-token':token
    })

    //clonar la peticion y añadirle los headers
    const clon = request.clone({ 
      headers
     })

     //enviar el clon
    console.log('Existia un token');
    return next.handle(clon)

  }else{ 
    //si no existe token devolver la solicitud tal como esta
    // console.log('no token ') 
    return next.handle(request)
   }


  }
}
