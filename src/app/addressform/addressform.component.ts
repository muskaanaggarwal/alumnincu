import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Addressmodel } from './address.model';

@Component({
  selector: 'app-addressform',
  templateUrl: './addressform.component.html',
  styleUrls: ['./addressform.component.css']
})
export class AddressformComponent implements OnInit {

  addressForm: FormGroup;
  address = new Addressmodel;

  url = 'http://localhost:9800/addressform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit() {
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

  localaddress() {
    let address_line_1: any = document.getElementById('address_line_1');
    let address_line_2: any = document.getElementById('address_line_2');
    let address_line_3: any = document.getElementById('address_line_3');
    let city: any = document.getElementById('city');
    let state: any = document.getElementById('state');
    let country: any = document.getElementById('country');
    let pincode: any = document.getElementById('pincode');


    if (address_line_1) {
      this.address.address_line_1 = address_line_1.value;
    }
    if (address_line_2) {
      this.address.address_line_2 = address_line_2.value;
    } if (address_line_3) {
      this.address.address_line_3 = address_line_3.value;
    } if (city) {
      this.address.city = city.value;
    } if (state) {
      this.address.state = state.value;
    } if (country) {
      this.address.country = country.value;
    } if (pincode) {
      this.address.pincode = pincode.value;
    }
    console.log(this.address);
  }

  addressform() {
    // console.log("Data before***", this.addressForm.value)
    // // execute the registerUser() given in the spring boot 
    // this.dataService.alumniportalUser(this.url, this.addressForm.value).subscribe((data: Array<any>) => {
    //   console.log("Data After***", data)
    // },
    //   (error: any) => {
    //     console.log("Error in saving the record", error);
    //   });
  }

}
