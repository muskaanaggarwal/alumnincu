import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() LoggedIn: boolean;
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter();
  constructor(private dataService: DataserviceService) {
  }
  user: Object;

  ngOnInit() {
    if (this.dataService.user) {
      this.user = this.dataService.user;
    }
  } 
  loggedIn(){
    this.isLoggedIn.emit(this.LoggedIn);
  }
  logout(){
    this.dataService.user = null;
    this.dataService.details = null;
  }

}