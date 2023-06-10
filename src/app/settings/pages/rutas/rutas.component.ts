import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RutasService } from '../../services/rutas.service';
import { rutaModel } from '../../models/ruta.model';
import { SesionService } from 'src/app/global/services/sesion.service';
import { ErrorsSettingsService } from '../../services/errors-settings.service';
import { AlertsService } from 'src/app/global/services/alerts.service';
import { ObservablesSetingsService } from '../../services/observables-setings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css'],
})
export class RutasComponent implements OnInit,OnDestroy {
  rutas: rutaModel[] = [];
  suscriptionServer?:Subscription;
  serverError:boolean=false;
  isLoading:boolean=false;

  constructor(
    private rutaService: RutasService,
    private sessionService: SesionService,
    private errorService: ErrorsSettingsService,
    private observables:ObservablesSetingsService,
    public alerts: AlertsService
  ) {}
  @ViewChild('container', { read: ViewContainerRef })
  containerRef!: ViewContainerRef;

  rol = this.sessionService.verifyRol();

  ngOnInit(): void {
    this.obtainRutas();
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

  obtainRutas() {
    this.isLoading = true;
    this.rutaService.obtainRutas().subscribe(
      (res) => {
        this.rutas = res;
        this.isLoading = false;
      },
      (err) => {
        this.errorService.checkError(err);
        this.isLoading=false;
      }
    );
  }

  updateRutaAlert(id: any, value: string) {
    const config = { id: id, value: value };

    const update = (data: string, id: any) => {
      this.updateRuta(data, id);
    };

    this.alerts.rutaEditInput(config, update);
  }

  updateRuta(data: string, id: any) {
    this.rutaService.editarRuta(data, id).subscribe(
      (res) => {
        const config = { message: 'Actualizado correctamente', timmer: 1000 };

        const obtain = () => {
          this.obtainRutas();
        };

        this.alerts.SuccesTimerFunction(config, obtain);
      },
      (err) => this.errorService.checkError(err)
    );
  }

  createRutaAlert(){
  const create = (data:any) => {
  this.createRuta(data);
  }

  this.alerts.rutaCreateInput(create);
  }

  async deleteRutahttp(id: any) {

    const confirm = await this.alerts.genericConfirmAlert('¿Estas seguro de que deseas eliminar esta ruta?')

    if(confirm){
      this.rutaService.deleteRuta(id).subscribe((res) => {
        const config = { message: 'Ruta actualizada correctamente', timmer: 1000 };
  
        const obtain = () => {
          this.obtainRutas();
        };
  
        this.alerts.SuccesTimerFunction(config, obtain);
      },
      err => this.errorService.checkError(err)
      );
    }

    
  }

  async reactivateRutahttp(id: any) {

    const confirm = await this.alerts.genericConfirmAlert('¿Estas seguro de que deseas reactivar esta ruta?')

    if(confirm){
      this.rutaService.reactivateRuta(id).subscribe((res) => {
        const config = { message: 'Ruta actualizada correctamente', timmer: 1000 };
  
        const obtain = () => {
          this.obtainRutas();
        };
        this.alerts.SuccesTimerFunction(config, obtain);
      },
      err => this.errorService.checkError(err)
      );
    }
  }

  async createRuta(data:any){
    const confirm = await this.alerts.genericConfirmAlert('¿Estas seguro de que deseas crear esta ruta?');

    if(confirm){
    this.rutaService.createRuta(data).subscribe(res => {
    
      const config = { message: 'Ruta creada correctamente!!', timmer: 1000 };

        const obtain = () => {
          this.obtainRutas();
        };

        this.alerts.SuccesTimerFunction(config, obtain); 
    },
    err => this.errorService.checkError(err)
    )
    }
  }



}
