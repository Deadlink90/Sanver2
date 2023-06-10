import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
  path:'',
  children:[
  {
  path:'all',
  component:UsersComponent  
  },
  {
  path:'**',
  pathMatch:'full',
  redirectTo:'all'  
  }  
  ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
