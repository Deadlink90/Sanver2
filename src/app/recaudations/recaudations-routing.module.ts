import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllComponent } from './components/get-all/get-all.component';
import { GetOneComponent } from './components/get-one/get-one.component';
import { CreateRecaudationComponent } from './components/create-recaudation/create-recaudation.component';

const routes: Routes = [
  {
  path:'',
  children:[
  {
  path:'all',
  component:GetAllComponent  
  },
  {
  path:'test',
  component:GetOneComponent  
  },
  {
  path:'crear', 
  component:CreateRecaudationComponent
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
export class RecaudationsRoutingModule { }
