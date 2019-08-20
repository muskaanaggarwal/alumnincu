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
  saved: boolean;
  errorMessage: string;
  successMessage: string;
  submitted = false;


  url = 'http://localhost:9800/addressform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
 
    this.addressForm = this.formBuilder.group({
      address_line_1: [''],
      address_line_2: [''],
      address_line_3: [''],
      city: [''],
      state: [''],
      country: [''],
      pincode: ['']
    });
   
  }

  // ngOnDestroy() {
  //   this.dataService.addressForm = this.addressForm;
  // }
  // checkSaved() {
  //   if (!this.saved) {
  //     this.errorMessage = "Please click save before you proceed!"
  //   }
  //   else {
  //     this.route.navigateByUrl('/personalform');
  //   }
  // }

  

  get f() { return this.addressForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }
    this.postAddress();
}

  postAddress() {
    if (!this.saved) {
      this.errorMessage = "";
      // if (this.addressForm.valid && this.dataService.user['roll_no'] != undefined) {
        // this.addressForm.value['roll_no'] = this.dataService.user['roll_no'];
        // console.log(this.addressForm);
        this.dataService.alumniportalUser(this.url, this.addressForm.value).subscribe((data: Array<any>) => {
          this.saved = true;
          this.successMessage = "Saved successfully! Click next to proceed"
        },
          (error: any) => {
            // this.errorMessage = error.message;
            console.log(error);

          });
      }
      // else {
      //   this.saved = false;
      //   this.errorMessage = 'Please fill all the details';
      // }
    }
  }

