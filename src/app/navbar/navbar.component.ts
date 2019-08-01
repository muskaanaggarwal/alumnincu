import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataService: DataserviceService) { }

  isLoggedIn: boolean;
  user: Object;

  ngOnInit() {
    this.isLoggedIn = false;
    if(this.dataService.user){
      this.isLoggedIn = true;
      this.user = this.dataService.user;
    }
    else{
      this.isLoggedIn = false; 
    }
  }

}