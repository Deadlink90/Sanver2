import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export interface config{
 message:string
 timmer:number 
}

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  async genericConfirmAlert(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        icon: 'question',
        title: 'Confirmacion',
        text: message,
        confirmButtonColor: '#2980B9',
        confirmButtonText: 'Confirmar',
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        didOpen: () => {
          const alertElement = Swal.getPopup();
          if (alertElement) {
            alertElement.style.left = '110px'; // Personaliza la posición horizontal
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async genericSuccesTimer(message: string, timmer: any): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        icon: 'success',
        title: message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: timmer, //1000 1 seconds 2000 2 seconds
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          const alertElement = Swal.getPopup();
          if (alertElement) {
            alertElement.style.left = '110px';
          }
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          resolve(true);
        }
      });
    });
  }

  SuccesTimerFunction(config: config, callback: () => void) {
    Swal.fire({
      icon: 'success',
      title: config.message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: config.timmer, //1000 1 seconds 2000 2 seconds
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        const alertElement = Swal.getPopup();
        if (alertElement) {
          alertElement.style.left = '110px';
        }
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        callback();
      }
    });
  }

  errorTimerFunction(config: any, callback: () => void) {
    Swal.fire({
      icon: 'error',
      title: config.message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: config.timmer, //1000 1 seconds 2000 2 seconds
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        const alertElement = Swal.getPopup();
        if (alertElement) {
          alertElement.style.left = '110px';
        }
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        callback();
      }
    });
  }

  genericShowError() {
    Swal.fire({
      icon: 'error',
      title: 'Error (500)',
      text: 'La peticion no pudo ser procesada',
      didOpen: () => {
        const alertElement = Swal.getPopup();
        if (alertElement) {
          alertElement.style.left = '110px'; // Personaliza la posición horizontal
        }
      },
    });
  }

  customizedError(message:string){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      didOpen: () => {
        const alertElement = Swal.getPopup();
        if (alertElement) {
          alertElement.style.left = '110px'; // Personaliza la posición horizontal
        }
      },
    });  
  }

  noAuthorized() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No autorizado',
      didOpen: () => {
        const alertElement = Swal.getPopup();
        if (alertElement) {
          alertElement.style.left = '110px'; // Personaliza la posición horizontal
        }
      },
    });
  }

  rutaEditInput(config:any,callback: (data:string,id:any) => void) {
    const id = config.id;
    Swal.fire({
      title: 'Ingrese el nuevo nombre',
      input: 'text',
      inputPlaceholder: 'Ruta',
      inputValue: config.value,
      inputAttributes:{id:'input0'},
      showCancelButton: true,
      inputLabel: 'Nombre de la ruta',
      confirmButtonColor:'#2980B9',
      cancelButtonColor:'#839192',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const alertElement = Swal.getPopup();
        if (alertElement) {
          alertElement.style.left = '110px'; 
        }
      },
      preConfirm: () =>{
        const value =  Swal.getInput()?.value;

        if (value?.trim() === '') {
          Swal.showValidationMessage('El nombre de la ruta no puede estar vacío');
          return false;
        }
        return value;
      }
    }).then(result => {
      if(result.value){
       callback(result.value,id);
      }
    })
  }

  rutaCreateInput(callback: (data:string) => void) {

      Swal.fire({
      title: 'Ingrese el nombre de la ruta',
      input: 'text',
      inputPlaceholder: 'Ruta',
      showCancelButton: true,
      inputLabel: 'Nombre de la ruta',
      inputAttributes:{id:'input'},
      confirmButtonColor:'#2980B9',
      cancelButtonColor:'#839192',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const alertElement = Swal.getPopup();
        if (alertElement) {
          alertElement.style.left = '110px'; 
        }
      },
      preConfirm: () =>{
        const value =  Swal.getInput()?.value;

        if (value?.trim() === '') {
          Swal.showValidationMessage('El nombre de la ruta no puede estar vacío');
          return false;
        }
        return value;
      }
    }).then(result => {
      if(result.value){
       callback(result.value);
      }
    })
  }
}
