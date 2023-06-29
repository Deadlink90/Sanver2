import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriversService } from '../../services/drivers.service';
import { driverModel } from '../../models/driver.model';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertsService, config, success } from 'src/app/global/services/alerts.service';
import { SesionService } from 'src/app/global/services/sesion.service';
import { ErrorsService } from '../../services/errors.service';
import { ObservablesService } from '../../services/observables.service';
import { Subscription } from 'rxjs';
import { BreadcrumbItem } from '../breadcrum/breadcrum.component';

interface ErrorsInt{
  message?:string,
  status?:string,
  TypeError?:string
}

interface ruta{
  nombre:string
  _id:any  
  }

@Component({
  selector: 'app-obtain-driver',
  templateUrl: './obtain-driver.component.html',
  styleUrls: ['./obtain-driver.component.css'],
})
export class ObtainDriverComponent implements OnInit,OnDestroy {

  notFoundedError:boolean=false;
  authorizationError:boolean=false;
  serverError:boolean=false;


  authorizationSuscription?:Subscription;
  serverSuscription?:Subscription;
  notFSuscription?:Subscription;

  errorsObject:ErrorsInt={};

  rutas:ruta[] = [];
  _id: any = '';
  //vinculado al formulario (copia)
  driver: driverModel = {} as driverModel;
  //se recibe de la respuesta (original)
  drivero:driverModel = {} as driverModel;

  isLoading: boolean = false;
  loadMor: boolean = false;

  disabledForms={
  generalForm:false,
  licenciaForm:false,
  contactoForm:false,
  registroForm:false
  }

  breadcrumbItems: BreadcrumbItem[] = [
    {label:'Menu',url:'/admin/choferes'},
    {label:'Lista de choferes',url:'/admin/choferes/listado'}
  ]
  currentPage:string='Editar chofer'


  constructor(
    private activatedRoute: ActivatedRoute,
    private driverService: DriversService,
    private alerts: AlertsService,
    public sesionService:SesionService,
    private errors:ErrorsService,
    private observables:ObservablesService,
    private router:Router
  ) {}

  rol = this.sesionService.verifyRol();

  ngOnInit(): void {
    this.obtainParams();
    this.obtainDriver();
    this.errorsInit();
    this.obtainRutas();
  }

  ngOnDestroy(): void {
    this.serverSuscription?.unsubscribe();
    this.authorizationSuscription?.unsubscribe();
    this.notFSuscription?.unsubscribe();
  }

  obtainRutas(){
    this.driverService.obtainRutas().subscribe(rutas => {
    this.rutas = rutas;
    },
    err => console.log(err)
    )  
    }

  errorsInit(){
    this.authorizationSuscription = this.observables.isAuthorizated$.subscribe(authorization => {
    this.authorizationError = authorization;
    }
    )
    
    this.serverSuscription = this.observables.serverError$.subscribe(error => {
    this.serverError = error;  
    })

    this.notFSuscription = this.observables.notFoundedError$.subscribe(notFounded =>{
    this.notFoundedError = notFounded;  
    })

    }



  obtainParams() {
    this.activatedRoute.params.subscribe((params) => {
      this._id = params['id'];
    });
  }

  obtainDriver() {
    this.isLoading = true;
    this.driverService.obtainDriver(this._id).subscribe(
      (res) => {
        this.drivero = res;
        this.driver = {...this.drivero}
        this.notFoundedError=false
        this.authorizationError=false;
        this.serverError=false
        this.isLoading = false;
      },
      (err) => {
      this.isLoading = false;
       this.errors.checkError(err);
      }
    );
  }

  toggleFlag() {
    this.loadMor = !this.loadMor;
  }



  async submitGeneral(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const confirm = await this.alerts.genericConfirmAlert(
      '¿Estas seguro de que deseas guardar los cambios?'
    );

    if (confirm) {
      this.editDriverHttp(form);
    }
  }

  async submitLicencia(form: NgForm) {
    if (form.invalid) {      
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const confirm = await this.alerts.genericConfirmAlert(
      '¿Estas seguro de que deseas guardar los cambios?'
    );

    if (confirm) {
      this.editDriverHttp(form);
    }
  }

  async submitContacto(form:NgForm){
    if (form.invalid) {      
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const confirm = await this.alerts.genericConfirmAlert(
      '¿Estas seguro de que deseas guardar los cambios?'
    );

    if (confirm) {
      this.editDriverHttp(form);
    }
  }

  async submitRegistro(form:NgForm){
    if (form.invalid) {      
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const confirm = await this.alerts.genericConfirmAlert(
      '¿Estas seguro de que deseas guardar los cambios?'
    );

    if (confirm) {
      this.editDriverHttp(form);
    }
  }



  async reactivateDriver(){
    const confirm = await this.alerts.genericConfirmAlert(
      '¿Estas seguro de que deseas reactivar a este chofer?'
    );

    if (confirm) {
    this.driverService.reactivateDriver(this.drivero._id).subscribe(res => {
      this.drivero = res;
      this.driver=res;
        this.alerts.genericSuccesTimer('Chofer actualizado con exito!!', 1200);
    },err => {
      this.alerts.genericShowError();
    })  
    }
  }

  restoregeneral(form:NgForm){
  form.setValue({
  nombre:this.drivero.nombre || '',
  paterno:this.drivero.paterno  || '',
  materno:this.drivero.materno || '',
  edad:this.drivero.edad || '',
  sexo:this.drivero.sexo || ''
  })
  this.disabledForms.generalForm = true;
  }

  restorelicense(form:NgForm){
    form.setValue({
    licencia:this.drivero.licencia  || '',
    tipo_licencia:this.drivero.tipo_licencia  || ''
    })
    this.disabledForms.licenciaForm = true;
  }

    restoreContacto(form:NgForm){
    form.setValue({
      domicilio:this.drivero.domicilio || '',
      telefono:this.drivero.telefono || ''
    })
    this.disabledForms.contactoForm=true;
    }

    restoreRegistro(form:NgForm){
    form.setValue({
    ruta:this.drivero.ruta || ''  
    })
    this.disabledForms.registroForm = true;
    }

  editDriverHttp(form: NgForm) {
    this.driverService.editDriver(form.value, this.drivero._id).subscribe(
      (res) => {
        this.drivero = res;
        this.driver = {...res};
        this.notFoundedError=false
        this.authorizationError=false;
        this.serverError=false
        
        const config:success={
        title:'Cambios guardados con exito!!',
        message:'¿Deseas ver el perfil actualizado?',
        confirmText:'Ver perfil' 
        }

        const callback = () => {
        this.router.navigate(['/admin/choferes/perfil',this.driver._id]);  
        }
        this.alerts.successConfirmAlert(config,callback);
      },
      (err) => {
        this.errors.checkError(err);
        this.notFoundedError=false
        this.authorizationError=false;
        this.serverError=false
      }
    );
  }




}
