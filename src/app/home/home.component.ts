import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  rotate(event: any){
    console.log(1);
    var a: HTMLElement = event.target || event.srcElement || event.currentTarget;
    a.style.transform = "rotateZ(180deg)";
    }

}
