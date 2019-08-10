import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataService: DataserviceService) {
  }
  isLoggedIn: boolean;
  user: Object;

  ngOnInit() {
    if (this.dataService.user) {
      this.isLoggedIn = true;
      this.user = this.dataService.user;
    }
    else{
      this.isLoggedIn = false;
    }
  }
  logout(){
    this.dataService.user = null;
    this.dataService.details = null;
  }

}