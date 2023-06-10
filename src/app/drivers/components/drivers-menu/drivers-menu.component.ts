import { Component } from '@angular/core';
import { SesionService } from 'src/app/global/services/sesion.service';

@Component({
  selector: 'app-drivers-menu',
  templateUrl: './drivers-menu.component.html',
  styleUrls: ['./drivers-menu.component.css']
})
export class DriversMenuComponent {

constructor (private sesionService:SesionService) {}

rol = this.sesionService.verifyRol();


}
