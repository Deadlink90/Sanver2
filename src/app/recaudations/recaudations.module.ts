import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecaudationsRoutingModule } from './recaudations-routing.module';
import { GetAllComponent } from './components/get-all/get-all.component';
import { GetOneComponent } from './components/get-one/get-one.component';
import { CreateRecaudationComponent } from './components/create-recaudation/create-recaudation.component';


@NgModule({
  declarations: [
    GetAllComponent,
    GetOneComponent,
    CreateRecaudationComponent
  ],
  imports: [
    CommonModule,
    RecaudationsRoutingModule
  ]
})
export class RecaudationsModule { }
