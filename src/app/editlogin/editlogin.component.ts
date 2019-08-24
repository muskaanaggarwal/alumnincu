import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { NgForm, NgModel } from "@angular/forms";
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';



@Component({
  selector: 'app-editlogin',
  templateUrl: './editlogin.component.html',
  styleUrls: ['./editlogin.component.css']
})
export class EditloginComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  check: Boolean = false;
  saved: Boolean;
  submitted = false;
  signupForm: FormGroup;
  details: object;
  verified: boolean;
  url = 'http://localhost:9800/signup';
  signupurl = "http://localhost:9800/details?id=";
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.errorMessage = null;
    this.signupForm = this.formBuilder.group({
      oldpassword: ['',Validators.required],
      password: ['', [Validators.minLength(8),Validators.required]],
      confirmPassword: ['',Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    else {
      this.dataService.get("http://localhost:9800/change?id=" + this.dataService.user['roll_no']).subscribe((data: Array<any>) => {
        this.details = data[0];
        // // this.signupForm.patchValue({
        // //   oldpassword: ['', Validators.pattern("/^" + data[0]['password'] + "$/")],
        // // }
        // );
      },
        (error) => {
          console.log(error);
        });
    }
      this.dataService.get(this.signupurl + this.dataService.user['roll_no']).subscribe((data: Array<any>) => {
        this.signupForm.patchValue({
          password: data['password'],
           
        } );
     
      },
      (error: any) => {
        console.log("Error in fetching details", error);
      });
  }

  ngOnDestroy() {
    this.dataService.signupForm = this.signupForm;
  }
  get f() { return this.signupForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.signup();

  }
  signup() {
    if (this.signupForm.valid) {
      this.errorMessage = "";
      this.signupForm.value['roll_no'] = this.details['roll_no'];
      this.signupForm.value['email'] = this.details['email'];
      this.signupForm.value['contact'] = this.details['contact'];
      this.signupForm.value['date_of_birth'] = this.details['date_of_birth'];
      this.signupForm.value['first_name'] = this.details['first_name'];
      this.signupForm.value['last_name'] = this.details['last_name'];
      if (this.details['isverified'] == 1) {
        this.verified = true;
      }
      else {
        this.verified = false;
      }
      this.signupForm.value['isverified'] = this.verified;
      this.dataService.alumniportalUser(this.url, this.signupForm.value).subscribe((data: Array<any>) => {
        this.successMessage = "Updated successfully!";
      },
        (error: any) => {
          this.errorMessage = error.message;
        });
    }
    else {
      console.log(this.signupForm.value);
      this.errorMessage = "No changes made!"
    }
  }

}