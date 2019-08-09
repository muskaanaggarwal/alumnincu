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
  check: Boolean =false;
  submitted = false;
  signupForm: FormGroup;
  url = 'http://localhost:9800/signup';
  // title = 'alumnincu';
  
  // Register your dataservice using dependency injection
  
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }
  ngOnInit() {
    this.errorMessage = null;
    this.signupForm = this.formBuilder.group({
      roll_no: ['',[Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['',[Validators.required, Validators.minLength(10)]],
      date_of_birth: ['',Validators.required],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      isverified: ['1'],
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
      console.log(1);

      return "iconfix"
      console.log(1);
      return;

    }
    this.signup();
     this.route.navigateByUrl('/alumni');
}
  signup() {
    console.log("Data before***", this.signupForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.signupForm.value).subscribe((data: Array<any>) => {
      console.log("Data After***", data);
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }
}