import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addressform',
  templateUrl: './addressform.component.html',
  styleUrls: ['./addressform.component.css']
})
export class AddressformComponent implements OnInit {
  alumniportalForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
