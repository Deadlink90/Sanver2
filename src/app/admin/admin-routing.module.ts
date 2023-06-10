import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
{
path:'',
children:[
{
path:'inicio',
component:MainComponent
},
{
path:'choferes',
loadChildren: () => import('../drivers/drivers.module').then(m => m.DriversModule)  
},
{
path:'recaudaciones',
loadChildren: () => import('../recaudations/recaudations.module').then(m => m.RecaudationsModule)  
},
{
path:'usuarios',
loadChildren: () => import('../users/users.module').then(m => m.UsersModule)  
},
{
path:'ajustes',
loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)  
},
{
path:'**',
pathMatch:'full',
redirectTo:'inicio'  
}
]  
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
