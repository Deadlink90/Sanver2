import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorsSettingsService } from '../../services/errors-settings.service';
import { SesionService } from 'src/app/global/services/sesion.service';
import { ObservablesSetingsService } from '../../services/observables-setings.service';
import { AlertsService, config } from 'src/app/global/services/alerts.service';
import { providerModel } from '../../models/provider.model';
import { Subscription } from 'rxjs';
import { ProvidersService } from '../../services/providers.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  serverError: boolean = false;
  providers:providerModel[] = [];
  suscriptionServer?:Subscription;
  editing:boolean=false;

  constructor(
    private errors: ErrorsSettingsService,
    private sessionService: SesionService,
    private observables:ObservablesSetingsService,
    private alerts:AlertsService,
    private providerService:ProvidersService
  ) {}

  rol = this.sessionService.verifyRol();

  ngOnInit(): void {
  this.obtainDriversHttp();
  this.errorsInit();  
  }

  ngOnDestroy(): void {
  this.suscriptionServer?.unsubscribe();
  }

  errorsInit(){
    this.suscriptionServer = this.observables.serverError$.subscribe(err => {
    this.serverError = err; 
    })
  }

  obtainDriversHttp(){
  this.isLoading = true
  this.providerService.obtainProviders().subscribe(res => {
  this.providers = res;
  this.isLoading=false;
  },
  err => {
    this.errors.checkError(err);
    this.isLoading=false;  
  }
  )  
  }

  editProviderHttp(id:any,status:string){
  const data={status:status};

  this.providerService.editProvider(data,id)
  .subscribe(res => {
    const config: config = {
      message: 'Proveedor actualizado con exito',
      timmer: 1200,
    };

    const reload = () => {
   this.obtainDriversHttp();
    };

    this.alerts.SuccesTimerFunction(config, reload);
  }, err => {
    this.errors.checkError(err);
    this.isLoading=false;
  }
  
  )
  }

  async deleteProvider(id:any){
    const confirm = await this.alerts.genericConfirmAlert('¿Estas seguro de que deseas eliminar a este proveedor?');

    if(confirm){
    this.editProviderHttp(id,'inactivo');
    }
  }

  async reactivateProvider(id:any){
    const confirm = await this.alerts.genericConfirmAlert('¿Estas seguro de que deseas activar a este proveedor?');

    if(confirm){
    this.editProviderHttp(id,'activo');
    }
  }

}
