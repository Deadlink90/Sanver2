import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../breadcrum/breadcrum.component';
import { SesionService } from 'src/app/global/services/sesion.service';
import { driverModel } from '../../models/driver.model';
import { ActivatedRoute } from '@angular/router';
import { DriversService } from '../../services/drivers.service';
import { ErrorsService } from '../../services/errors.service';
import { Subscription } from 'rxjs';
import { ObservablesService } from '../../services/observables.service';
import { AlertsService, success } from 'src/app/global/services/alerts.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css'],
})
export class EditDriverComponent implements OnInit {
  //vinculado al formulario (copia)
  driver: driverModel = {} as driverModel;
  isLoading: boolean = false;
  _id:any ='';
  error:string='';
  ES?:Subscription;
  updateSpinner:boolean=false;

  constructor(
    private sessionService: SesionService,
    private activatedRoute: ActivatedRoute,
    private driverService:DriversService,
    private errors:ErrorsService,
    private observables:ObservablesService,
    private alerts:AlertsService
  ) {}

  ngOnInit(): void {
    this.obtainParams();
    this.obtainDriver();
    this.initializeError();
  }

  rol = this.sessionService.verifyRol();

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Menu', url: '/admin/choferes' },
    { label: 'Lista de choferes', url: '/admin/choferes/listado' },
  ];
  currentPage: string = 'Perfil del chofer';

  initializeError(){
  this.ES = this.observables.errorString$.subscribe(err => {
  this.error = err;  
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
        this.driver = res;
        this.isLoading = false;
      },
      (err) => {
      this.isLoading = false;
       this.errors.checkError(err);
      }
    );
  }

  async reactivateDriver(){
  const confirm = await this.alerts.genericConfirmAlert('¿Deseas reactivar a este empleado?')

  if(confirm){
  this.reactivateDriverHttp();
  }
  }

  reactivateDriverHttp(){
  this.updateSpinner=true;  
  this.driverService.reactivateDriver(this._id).subscribe(res => {
  this.driver = res;
  this.updateSpinner=false;
  const config:success={
    message:'Chofer reactivado con exito!!',
    title:'Operacion completa!!',
    confirmText:'Aceptar'
  }
  this.alerts.genericShowSuccess(config);
  
  },err => {
  this.errors.checkError(err);  
  this.updateSpinner=false;
  })  
  }
}
