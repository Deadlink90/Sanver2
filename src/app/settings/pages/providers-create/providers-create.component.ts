import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../components/breadcrum/breadcrum.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvidersService } from '../../services/providers.service';
import { Router } from '@angular/router';
import { AlertsService, config } from 'src/app/global/services/alerts.service';
import { ErrorsSettingsService } from '../../services/errors-settings.service';

@Component({
  selector: 'app-providers-create',
  templateUrl: './providers-create.component.html',
  styleUrls: ['./providers-create.component.css'],
})
export class ProvidersCreateComponent implements OnInit {
  breadcrumItems: BreadcrumbItem[] = [
    { label: 'Menu', url: '/admin/ajustes' },
    { label: 'Lista de proveedores', url: '/admin/ajustes/proveedores' },
  ];
  currentPage: string = 'Crear proveedor';
  isLoading:boolean=false;

  constructor(
    private fb: FormBuilder,
    private providerService: ProvidersService,
    private router: Router,
    private alerts: AlertsService,
    private error: ErrorsSettingsService
      ) {}

  ngOnInit(): void {
    this.addTicket();
  }

  providerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(45)]],
    precio: ['', [Validators.required]],
    tickets: this.fb.array([]),
  });

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

  async createProvider(){

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

  const confirm = await this.alerts.genericConfirmAlert('¿Estas seguro de que deseas añadir a este proveedor?');

  if(confirm){
  this.createProviderHttp();
  }

  }

  createProviderHttp() {
    this.providerService.createProvider(this.providerForm.value).subscribe(
      (res) => {
        const config: config = {
          message: 'Proveedor creado con exito',
          timmer: 1200,
        };

        const redirect = () => {
          this.router.navigate(['/admin/ajustes/proveedores']);
        };

        this.alerts.SuccesTimerFunction(config, redirect);
      },
      (err) => {
        this.error.checkError(err);
      }
    );
  }



}
