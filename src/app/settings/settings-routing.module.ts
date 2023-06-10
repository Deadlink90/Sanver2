import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ProvidersCreateComponent } from './pages/providers-create/providers-create.component';
import { EditProvidersComponent } from './pages/edit-providers/edit-providers.component';


const routes: Routes = [
  {
  path:'',
  children:[
  {
  path:'',
  component:MenuComponent
  },
  {
  path:'rutas',
  component:RutasComponent  
  },
  {
  path:'proveedores',
  component:ProveedoresComponent  
  },
  {
  path:'proveedores/nuevo',
  component:ProvidersCreateComponent  
  },
  {
   path:'proveedores/editar/:id',
   component:EditProvidersComponent
  },
  {
  path:'**',
  pathMatch:'full',
  redirectTo:''
  }
  ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
