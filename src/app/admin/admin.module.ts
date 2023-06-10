import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';

import { SesionService } from '../global/services/sesion.service';

@NgModule({

  declarations: [
    DashboardComponent,
    MainComponent
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers:[
  SesionService
  ]
})
export class AdminModule { }
