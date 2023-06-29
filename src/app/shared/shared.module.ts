import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './dashboard/footer/footer.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { TemplateComponent } from './dashboard/template/template.component';
import { DriversRoutingModule } from '../drivers/drivers-routing.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    DriversRoutingModule,
    MaterialModule
  ],
  exports:[
  TemplateComponent  
  ]
})
export class SharedModule { }
