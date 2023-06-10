import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObservablesService } from 'src/app/global/services/observables.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  constructor (private observerService:ObservablesService,
   private router:Router) {}

  user = localStorage.getItem('username');


  logout(){
  this.observerService.userLoged$.emit(false);
  localStorage.removeItem('isLoged');
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  this.router.navigate(['/auth/login'])
  }

}
