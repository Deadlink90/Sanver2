import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MenuComponent } from './pages/menu/menu.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { BreadcrumComponent } from './components/breadcrum/breadcrum.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { ProvidersCreateComponent } from './pages/providers-create/providers-create.component';
import { NgxMaskModule } from 'ngx-mask-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProvidersComponent } from './pages/edit-providers/edit-providers.component';

@NgModule({
  declarations: [
    MenuComponent,
    RutasComponent,
    BreadcrumComponent,
    ProveedoresComponent,
    ProvidersCreateComponent,
    EditProvidersComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    HttpClientModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SettingsModule { }
