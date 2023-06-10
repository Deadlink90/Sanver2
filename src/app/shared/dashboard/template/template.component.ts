import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit{
  loggedCount:any=localStorage.getItem('logCount')

  ngOnInit(): void {
    this.refreshPage();
  }

  refreshPage(){
    // console.log('Se ejecuta');
    if(parseInt(this.loggedCount) ===2 ){
      localStorage.setItem('logCount', '1')
      window.location.reload();
      // console.log('Se aplica');
    }  
  }

  
}
