import { Injectable } from '@angular/core';
import { ObservablesService } from './observables.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface user {
  username:string,
  rol:string 
 }

@Injectable({
  providedIn: 'root',
})

export class SesionService {
  constructor(
    private observerService: ObservablesService,
    private router: Router
  ) {}

  user:user = {} as user;

  expiredSession() {
    Swal.fire({
      icon: 'error',
      title: 'Sesion Caducada',
      text: 'Vuelve a iniciar sesion',
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        const alertElement = Swal.getPopup();
        if (alertElement) {
          alertElement.style.left = '110px'; // Personaliza la posición horizontal
        }
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.observerService.userLoged$.emit(false);
        localStorage.removeItem('isLoged');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  verifyRol(){
  const token = localStorage.getItem('token');
  const isLoged = localStorage.getItem('isLoged')
  const rol = localStorage.getItem('rol');
  const roles = ['user','moderator','admin'];
  let exists = false;
  

  if(token || isLoged){
    if(!rol){
      return window.location.reload();
   }else{
     roles.forEach(rolArray => {
       if(rol === rolArray){
       exists = true;
       }  
       })
     
       if(!exists){
         return window.location.reload()
       }else{
        return rol;
       }
   }
  }
  
  
  }



  


}
