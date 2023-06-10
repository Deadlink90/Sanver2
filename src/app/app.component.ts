import { Component, OnInit } from '@angular/core';
import { ObservablesService } from './global/services/observables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private observable:ObservablesService) {}

  isLogedLocal= localStorage.getItem('isLoged'); 

  userLoged = this.isLogedLocal ? true : false;
  

  ngOnInit(): void {
    this.userIsLoged();
  }

  userIsLoged(){
  this.observable.userLoged$.subscribe( loged => {
   this.userLoged = loged; 
   console.log(loged)
  })
  }





 
}
