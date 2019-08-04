import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Addressmodel } from './address.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addressform',
  templateUrl: './addressform.component.html',
  styleUrls: ['./addressform.component.css']
})
export class AddressformComponent implements OnInit {

  addressForm: FormGroup;
  address = new Addressmodel;

  url = 'http://localhost:9800/addressform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    if(!this.dataService.user){
      this.route.navigateByUrl('/alumni');
      return;
    }
    this.addressForm = this.formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      address_line_3: [''],
      city: [''],
      state: [''],
      country: [''],
      pincode: ['']
    });
    if (this.dataService.addressForm) {
      this.addressForm = this.dataService.addressForm;
    }
  }
  ngOnDestroy() {
    this.dataService.addressForm = this.addressForm;
  }

  addressform() {
    
  }

}
