import { Component, OnInit } from '@angular/core';
import { ObservablesService } from 'src/app/global/services/observables.service';
import { SesionService } from 'src/app/global/services/sesion.service';

interface user {
  username:string,
  rol:string 
 }

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor (public sesionService:SesionService) {
  }

  // rol = this.sesionService.verifyRol();
 
  ngOnInit(): void {
  // this.sesionService.verifyRol();
  }




}
