import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversComponent } from './components/drivers/drivers.component';
import { EditDriverComponent } from './components/edit-driver/edit-driver.component';
import { CreateDriverComponent } from './components/create-driver/create-driver.component';
import { DeleteDriverComponent } from './components/delete-driver/delete-driver.component';
import { ObtainDriverComponent } from './components/obtain-driver/obtain-driver.component';
import { DriversMenuComponent } from './components/drivers-menu/drivers-menu.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
  path:'',
  children:[
  {
  path:'',
  component:DriversMenuComponent
  },  
  {
  path:'listado',
  component:DriversComponent,
  canActivate:[AdminGuard]
  },
  {
  path:'crear',
  component:CreateDriverComponent,
  canActivate:[AdminGuard]
  },
  {
  path:'eliminar/:id',
  component:DeleteDriverComponent
  },
  {
  path:'editar/:id',
  component:EditDriverComponent  
  },
  {
  path:'ver/:id',
  component:ObtainDriverComponent
  },
  {
  path:'**',
  pathMatch:'full',
  redirectTo:'listado'  
  }
  ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
