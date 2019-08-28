import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { NgForm, NgModel } from "@angular/forms";
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string;
  check: Boolean = false;
  submitted = false;
  signupForm: FormGroup;
  url = 'http://localhost:9800/signup';
  details_url = 'http://localhost:9800/personal/details?id=';
  // title = 'alumnincu';

  // Register your dataservice using dependency injection

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }
  ngOnInit() {
    this.errorMessage = null;
    this.signupForm = this.formBuilder.group({
      roll_no: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(10)]],
      date_of_birth: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      accepted: ['', Validators.required],
      isverified: [false],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }


  get f() { return this.signupForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.signupForm.value['roll_no'] = this.signupForm.value['roll_no'].toUpperCase();
    this.dataService.get(this.details_url + this.signupForm.value['roll_no']).subscribe((data: Array<any>) => {
      if(Object.entries(data).length === 0 && data.constructor === Object){
        this.signup();
        this.route.navigateByUrl('/alumni');
      }
      else{
        this.errorMessage = 'User already exists with provided details!';
      }
    }, (error) => {
      // console.log(error);
    });
  }
    signup() {
      this.dataService.alumniportalUser(this.url, this.signupForm.value).subscribe((data: Array<any>) => {
      },

        (error: any) => {
          console.log(error);
        });
    }
  }