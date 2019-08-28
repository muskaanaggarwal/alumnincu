import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    if (this.dataService.user) {
      this.route.navigateByUrl('/dashboard');
      return;
    }
  }
  rotate(event: any){
    // console.log(1);
    var a: HTMLElement = event.target || event.srcElement || event.currentTarget;
    a.style.transform = "rotateZ(180deg)";
    }

}
