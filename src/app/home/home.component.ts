import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  AddMusic:any;
  currentRate = 8;
  constructor() { }

  ngOnInit() {
    this.AddMusic=false;
  }
  addForm(){
    this.AddMusic=true;
  }
  clickstars(){
    console.log(true);
    
  }
}
