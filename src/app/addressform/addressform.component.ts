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
  isSubmitted = false;

  saved: boolean;
  submitted = false;
  errorMessage: string;
  successMessage: string;
  url = 'http://localhost:9800/addressform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    this.addressForm = this.formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      address_line_3: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required]
    });
    if (this.dataService.addressForm) {
      this.addressForm = this.dataService.addressForm;
    }
  }

  ngOnDestroy() {
    this.dataService.addressForm = this.addressForm;
  }
  checkSaved() {
    this.route.navigateByUrl('/personalform');

    // if (!this.saved) {
    //   this.errorMessage = "Please click save before you proceed!"
    // }
    // else {
    //   this.route.navigateByUrl('/personalform');
    // }
  }

  get f() { return this.addressForm.controls; }
  onSubmit() {
    this.isSubmitted = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }
    this.postAddress()
  }

  postAddress() {
      this.errorMessage = "";
      if (this.addressForm.valid && this.dataService.user['roll_no'] != undefined) {
        this.addressForm.value['roll_no'] = this.dataService.user['roll_no'];
        // console.log(this.addressForm);
        this.dataService.alumniportalUser(this.url, this.addressForm.value).subscribe((data: Array<any>) => {
          this.saved = true;
          this.successMessage = "Saved successfully! Click next to proceed"
        },
          (error: any) => {
            this.errorMessage = error.message;
          });
      }
      else {
        this.saved = false;
        this.errorMessage = 'Please fill all the details';
      }
    
  }
}
