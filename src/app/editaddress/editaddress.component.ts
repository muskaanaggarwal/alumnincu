import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['../editlogin/editlogin.component.css']
})
export class EditaddressComponent implements OnInit {

  addressForm: FormGroup;
   errorMessage: string;
   successMessage: string;
  // submitted = false;
  url = 'http://localhost:9800/addressform';
  addressurl = "http://localhost:9800/address/details?id=";
  address_id: number;
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

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
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    this.dataService.get(this.addressurl + this.dataService.user['roll_no']).subscribe((data: Array<any>) => {
      this.addressForm.patchValue({
        address_line_1: data['address_line_1'],
        address_line_2: data['address_line_2'],
        address_line_3: data['address_line_3'],
        city: data['city'],
        state: data['state'],
        country: data['country'],
        pincode: data['pincode'],



      } );
      this.address_id = data['address_id'];

      
    },
    (error: any) => {
      console.log("Error in fetching details", error);
    });
        if (this.dataService.addressForm) {
      this.addressForm = this.dataService.addressForm;
    }
  }

  ngOnDestroy() {
    this.dataService.addressForm = this.addressForm;
  }

  postAddress() {
    if (this.addressForm.valid && this.dataService.user['roll_no'] != undefined) {
      this.addressForm.value['roll_no'] = this.dataService.user['roll_no'];
      this.dataService.alumniportalUser(this.url, this.addressForm.value).subscribe((data: Array<any>) => {
        this.successMessage = "Saved successfully! Click next to proceed"
      },
        (error: any) => {
          this.errorMessage = error.message;
        });
    }
    else {
      this.errorMessage = 'Please fill all the details';
    }
  }

}
