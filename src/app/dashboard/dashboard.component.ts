import { Component, OnInit } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../home/home.component.css']
})
@Pipe({
  name: 'safeHtml'
})
export class DashboardComponent implements OnInit {
  photoUri: any;
  personalurl = "http://localhost:9800/details?id=";

  constructor(private dataService: DataserviceService, private route: Router, private _sanitizer: DomSanitizer) { }

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
    this.dataService.get(this.personalurl + this.dataService.user['roll_no']).subscribe((data: Array<any>) => {
      let img = data[0]['photo'];
      img = img.split('\\');
      img = img[img.length-1];
      this.photoUri = "http://localhost:9800/"+ img;
    }, (error) => {
    });
  }

}
