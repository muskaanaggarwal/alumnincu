import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../home/home.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataserviceService, private route: Router) { }

  isLoggedIn: boolean;
  user: Object;
  details: Object;

  ngOnInit() {
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    this.isLoggedIn = false;
    if (this.dataService.user) {
      this.isLoggedIn = true;
      this.user = this.dataService.user;
    }
    else {
      this.isLoggedIn = false;
    }
    if (this.dataService.details) {
      this.details = this.dataService.details;
    }
    else {
      this.details = null;
    }
  }

}
