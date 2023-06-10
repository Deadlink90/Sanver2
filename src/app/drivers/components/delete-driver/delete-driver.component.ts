import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriversService } from '../../services/drivers.service';
import { driverModel } from '../../models/driver.model';
import { AlertsService } from 'src/app/global/services/alerts.service';
import { NgForm } from '@angular/forms';
import { ErrorsService } from '../../services/errors.service';
import { Subscription } from 'rxjs';
import { ObservablesService } from '../../services/observables.service';
import { SesionService } from 'src/app/global/services/sesion.service';
import { BreadcrumbItem } from '../breadcrum/breadcrum.component';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']
})
export class DeleteDriverComponent implements OnInit,OnDestroy {
  isLoading: boolean = false;
  _id:any='';
  razon:string=''
  status:string='inactivo'
  driver: driverModel = {} as driverModel;

  notFoundedError:boolean=false;
  authorizationError:boolean=false;
  serverError:boolean=false;

  authorizationSuscription?:Subscription;
  serverSuscription?:Subscription;
  notFSuscription?:Subscription;

  breadcrumbItems: BreadcrumbItem[] = [
    {label:'Menu',url:'/admin/choferes'},
    {label:'Listado',url:'/admin/choferes/listado'}
  ]

  currentPage:string='Eliminar chofer'


  constructor (private activatedRoute:ActivatedRoute,private driverService:DriversService,private alerts:AlertsService,private router:Router,
    private errors:ErrorsService,
    private observables:ObservablesService,
    private sesionService:SesionService) {}

    rol = this.sesionService.verifyRol();

  ngOnInit(): void {
    this.obtainParams();
    this.obtainDriver();
    this.errorsInit();
  }

  ngOnDestroy(): void {
    this.serverSuscription?.unsubscribe();
    this.authorizationSuscription?.unsubscribe();
    this.notFSuscription?.unsubscribe();
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
        this.driver = res;
        this.notFoundedError=false
        this.authorizationError=false;
        this.serverError=false
        this.isLoading=false;
      },
      (err) => {
       this.errors.checkError(err);
       this.isLoading=false;
      }
    );
  }

  async sendForm(form:NgForm){
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    const confirm = await this.alerts.genericConfirmAlert(
      '¿Estas seguro de que deseas dar de baja a este chofer?'
    );

    if (confirm) {
      this.editDriverHttp(form);
    }  
  }

  editDriverHttp(form: NgForm) {
    this.driverService.editDriver(form.value, this.driver._id).subscribe(
      (res) => {
        this.driver = res;

        const redirect = () => {
        this.router.navigate(['/admin/choferes/ver',this.driver._id]);
        }

        const config = {
        message:'Chofer actualizado con exito!!',
        timmer:1500 
        }

        this.notFoundedError=false
        this.authorizationError=false;
        this.serverError=false
        
        this.alerts.SuccesTimerFunction(config,redirect);
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
