import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversRoutingModule } from './drivers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DriversComponent } from './components/drivers/drivers.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask-2';
import { HttpClientModule } from '@angular/common/http';
import { FileSaverModule } from 'ngx-filesaver';
import { MaterialModule } from '../material/material.module';
import { DeleteDriverComponent } from './components/delete-driver/delete-driver.component';
import { CreateDriverComponent } from './components/create-driver/create-driver.component';
import { EditDriverComponent } from './components/edit-driver/edit-driver.component';
import { ObtainDriverComponent } from './components/obtain-driver/obtain-driver.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DriversMenuComponent } from './components/drivers-menu/drivers-menu.component';
import { QueryGuard } from './guards/query.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertsService } from '../global/services/alerts.service';
import { BreadcrumComponent } from './components/breadcrum/breadcrum.component';


@NgModule({
  declarations: [
    DriversComponent,
    DeleteDriverComponent,
    CreateDriverComponent,
    EditDriverComponent,
    ObtainDriverComponent,
    CapitalizePipe,
    DriversMenuComponent,
    BreadcrumComponent,
  ],
  imports: [
    CommonModule,
    DriversRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    FileSaverModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
   QueryGuard,
   AlertsService 
  ]
})
export class DriversModule { }
