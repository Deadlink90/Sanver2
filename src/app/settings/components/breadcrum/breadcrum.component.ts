import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrum-settings',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.css']
})
export class BreadcrumComponent {

  @Input() items: BreadcrumbItem[] = [];
  @Input() current:string ='';
}
