import { Component } from '@angular/core';
import { SesionService } from 'src/app/global/services/sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

constructor ( private sessionService:SesionService) {}

rol = this.sessionService.verifyRol();

}
