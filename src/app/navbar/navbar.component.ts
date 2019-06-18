import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbar: HTMLElement;
  sticky: number;
  constructor() { }

  ngOnInit() {
    this.navbar = document.getElementById("navbar");
    this.sticky = this.navbar.offsetTop;
  }
  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    //we'll do some stuff here when the window is scrolled  
    this.myFunction();
  }

  myFunction(): void {
    if (window.pageYOffset >= this.sticky) {
      this.navbar.classList.add("sticky")
    } else {
      this.navbar.classList.remove("sticky");
    }
  }

}
