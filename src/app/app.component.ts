import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @Input() isLoggedIn: boolean;
  
  title = 'alumnincu';
  constructor(){}
  ngOnInit(){}
  loggedIn(value: boolean){
    // console.log(1, value);
    this.isLoggedIn = value;
  }
}
