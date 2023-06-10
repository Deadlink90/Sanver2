import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../components/breadcrum/breadcrum.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvidersService } from '../../services/providers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService, config } from 'src/app/global/services/alerts.service';
import { ErrorsSettingsService } from '../../services/errors-settings.service';
import { providerModel } from '../../models/provider.model';
import { Subscription } from 'rxjs';
import { ObservablesSetingsService } from '../../services/observables-setings.service';

@Component({
  selector: 'app-edit-providers',
  templateUrl: './edit-providers.component.html',
  styleUrls: ['./edit-providers.component.css'],
})
export class EditProvidersComponent implements OnInit,OnDestroy{

  serverError:boolean=false;
  notFounded:boolean=false;
  notUpdated:boolean=false;

  sE?:Subscription;
  nF?:Subscription;
  nU?:Subscription;

  provider:providerModel = {} as providerModel;
  providerCopy:providerModel = {} as providerModel;

  id:any='';

  formDisabled:boolean=false;
  aa:boolean=false;

  breadcrumItems: BreadcrumbItem[] = [
    { label: 'Menu', url: '/admin/ajustes' },
    { label: 'Lista de proveedores', url: '/admin/ajustes/proveedores' },
  ];
  currentPage: string = 'Crear proveedor';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private providerService: ProvidersService,
    private router: Router,
    private alerts: AlertsService,
    private error: ErrorsSettingsService,
    private activatedRoute:ActivatedRoute,
    private observables: ObservablesSetingsService
  ) {}

  ngOnInit(): void {
  this.obtainId();
  this.obtainProviderHttp(this.id);
  this.initErrors();
  }

  ngOnDestroy(): void {
  this.sE?.unsubscribe();
  this.nF?.unsubscribe();
  this.nU?.unsubscribe();  
  }

  providerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(45)]],
    precio: ['', [Validators.required]],
    tickets: this.fb.array([]),
  });

  initErrors(){
   this.sE = this.observables.serverError$.subscribe(err => {
    this.serverError=err;  
    })

    this.nF = this.observables.notFounded$.subscribe(err => {
    this.notFounded = err;  
    })

    this.nU = this.observables.notUpdate$.subscribe(err => {
     this.notUpdated=err 
    })

  }

  disableInputs(){

    if(this.formDisabled === true){
    this.formReset();
    this.formDisabled = false;
    }

  return Object.values(this.providerForm.controls).forEach(control => {
    if(control instanceof FormArray){
    control.controls.forEach(arrayControl => {
      arrayControl.disable();
    })
    }
    control.disable();
  })  
  }

  enableInputs(){
    this.formDisabled=true;
    return Object.values(this.providerForm.controls).forEach(control => {
      if(control instanceof FormArray){
      control.controls.forEach(arrayControl => {
        arrayControl.enable();
      })
      }
      control.enable();
    })  
    }

  get Tickets() {
    return this.providerForm.get('tickets') as FormArray;
  }

  addTicket() {
    if (this.Tickets.length >= 5) return;
    this.Tickets.push(this.fb.control('', Validators.required));
  }

  deleteTicket(indice: number) {
    this.Tickets.removeAt(indice);
  }

  get nombreValidator() {
    return (
      this.providerForm.get('nombre')?.invalid &&
      this.providerForm.get('nombre')?.touched
    );
  }

  get precioValidator() {
    return (
      this.providerForm.get('precio')?.invalid &&
      this.providerForm.get('precio')?.touched
    );
  }

  ticketValidator(i: number) {
    return this.Tickets.controls[i].invalid && this.Tickets.controls[i].touched;
  }

  obtainId(){
  this.activatedRoute.params.subscribe(params => {
  this.id = params['id'] 
  })  
  }
 
  formInit(){
    this.providerForm.reset({
      nombre:this.provider.nombre,
      precio:this.provider.precio,
      });
      this.provider.tickets.map(ticket => {
        this.Tickets.push(this.fb.control(ticket, Validators.required));   
      })
  }

  formReset(){

    this.Tickets.clear();
    this.providerForm.reset({
      nombre:this.providerCopy.nombre,
      precio:this.providerCopy.precio,
      
      });
      this.providerCopy.tickets.map(ticket => {
        this.Tickets.push(this.fb.control(ticket, Validators.required));   
      })
  }

  async editProvider(){
    if(this.providerForm.invalid){
      return Object.values(this.providerForm.controls).
       forEach(control => {
   
         if (control instanceof FormArray) {
           control.controls.forEach((arrayControl: any) => {
             arrayControl.markAsTouched();
           });
         } else {
           control.markAsTouched();
         }
      })
       }

  const confirm = await this.alerts.genericConfirmAlert('¿Estas seguro de que deseas guardar los cambios realizados en el proveedor?')  

  if(confirm){
   this.editProviderHttp();
  }

  }

  editProviderHttp(){
  this.providerService.editProvider(this.providerForm.value,this.id)
  .subscribe(res => {

    this.serverError=false;
    this.notFounded=false;
    this.notUpdated=false
    this.isLoading=false;

    const config:config = {message:'Proveedor actualizado con exito',timmer:1200}

    const redirect = () => {
    this.router.navigate(['/admin/ajustes/proveedores'])  
    }
    
   this.alerts.SuccesTimerFunction(config,redirect);
  },
  err => {
    this.error.checkError(err)  
  }
  )  
  }

  obtainProviderHttp(id:any){
    this.isLoading=true;  
    this.providerService.obtainProvider(id).subscribe(res => {
    this.provider = res;  
    this.providerCopy= res;
    this.formInit();
    this.disableInputs();
    this.serverError=false;
    this.notFounded=false;
    this.notUpdated=false
    this.isLoading=false;
    },
    err => {
    this.error.checkError(err)
    this.isLoading=false;
    } 
    ) 
    }



}
