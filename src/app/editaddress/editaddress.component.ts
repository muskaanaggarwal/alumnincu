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
  submitted = false;


  url = 'http://localhost:9800/addressform';
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
