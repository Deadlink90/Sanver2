import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestGuard } from './global/guards/test.guard';
import { NoLoginGuard } from './global/guards/no-login.guard';


const routes: Routes = [
  {
    path: 'admin',
    canLoad:[TestGuard],
    loadChildren: () =>
    import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    canLoad:[NoLoginGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
