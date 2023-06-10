import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/global/services/alerts.service';
import { DriversService } from '../../services/drivers.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ErrorsService } from '../../services/errors.service';
import { SesionService } from 'src/app/global/services/sesion.service';
import { BreadcrumbItem } from '../breadcrum/breadcrum.component';

interface ruta{
nombre:string
_id:any  
}

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css'],
})

export class CreateDriverComponent implements OnInit {
  confirmMessage: string = '¿Estas seguro de que deseas agregar a este chofer';
  sucessMessage: string = 'Chofer creado con exito!!';
  errorAlertBoot:boolean=false;

  rutas:ruta[] = [];

  breadcrumbItems: BreadcrumbItem[] = [
    {label:'Menu',url:'/admin/choferes'},
    {label:'Listado',url:'/admin/choferes/listado'}
  ]

  currentPage:string='Crear nuevo'

  constructor(
    private fb: FormBuilder,
    private alerts: AlertsService,
    private driverService: DriversService,
    private router:Router,
    private error:ErrorsService,
    private sesionService:SesionService
  ) {}

  rol = this.sesionService.verifyRol();

  ngOnInit(): void {
    this.obtainRutas();
  }

  driverForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
    paterno: ['', [Validators.required, Validators.maxLength(20)]],
    materno: ['', [Validators.required, Validators.maxLength(20)]],
    edad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    sexo: ['Masculino', [Validators.required]],
    codigo: [
      '',
      [Validators.maxLength(6), Validators.minLength(6), Validators.required],
    ],
    licencia: ['', [Validators.required]],
    tipo_licencia: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
    domicilio: ['', [Validators.required]],
    telefono: ['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
  });

  async createDriver() {
    if (this.driverForm.invalid) {
      return Object.values(this.driverForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    const confirm = await this.alerts.genericConfirmAlert(this.confirmMessage);

    if (confirm) {
      this.driverService
        .createDriver(this.driverForm.value)
        .subscribe((res) => {
          this.errorAlertBoot = false;
          Swal.fire({
            icon: 'success',
            title: this.sucessMessage,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 2000,
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
            this.router.navigate(['/admin/choferes/ver',res.id])
            }
          });
        },err => {
          this.error.checkError(err);
          this.errorAlertBoot = true;
         
        });
    }
  }

  obtainRutas(){
  this.driverService.obtainRutas().subscribe(rutas => {
  this.rutas = rutas;
  },
  err => console.log(err)
  )  
  }

  get nombreValidator() {
    return (
      this.driverForm.get('nombre')?.invalid &&
      this.driverForm.get('nombre')?.touched
    );
  }

  get paternoValidator() {
    return (
      this.driverForm.get('paterno')?.invalid &&
      this.driverForm.get('paterno')?.touched
    );
  }

  get maternoValidator() {
    return (
      this.driverForm.get('materno')?.invalid &&
      this.driverForm.get('materno')?.touched
    );
  }

  get edadValidator() {
    return (
      this.driverForm.get('edad')?.invalid &&
      this.driverForm.get('edad')?.touched
    );
  }

  get sexoValidator() {
    return (
      this.driverForm.get('sexo')?.invalid &&
      this.driverForm.get('sexo')?.touched
    );
  }

  get codigoValidator() {
    return (
      this.driverForm.get('codigo')?.invalid &&
      this.driverForm.get('codigo')?.touched
    );
  }

  get licenciaValidator() {
    return (
      this.driverForm.get('licencia')?.invalid &&
      this.driverForm.get('licencia')?.touched
    );
  }

  get tipo_licenciaValidator() {
    return (
      this.driverForm.get('tipo_licencia')?.invalid &&
      this.driverForm.get('tipo_licencia')?.touched
    );
  }

  get rutaValidator() {
    return (
      this.driverForm.get('ruta')?.invalid &&
      this.driverForm.get('ruta')?.touched
    );
  }

  get domicilioValidator() {
    return (
      this.driverForm.get('domicilio')?.invalid &&
      this.driverForm.get('domicilio')?.touched
    );
  }

  get telefonoValidator() {
    return (
      this.driverForm.get('telefono')?.invalid &&
      this.driverForm.get('telefono')?.touched
    );
  }
}
