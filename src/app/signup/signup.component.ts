import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { NgForm, NgModel } from "@angular/forms";
import { Router } from '@angular/router';
// import { MustMatch } from './_helpers/must-match.validator';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string;
  submitted = false;
  signupForm: FormGroup;
  url = 'http://localhost:9800/signup';
  // title = 'alumnincu';
  
  // Register your dataservice using dependency injection
  
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }
  ngOnInit() {
    this.errorMessage = null;
    this.signupForm = this.formBuilder.group({
      roll_no: ['',Validators.required],
      email: ['',Validators.required],
      contact: ['',Validators.required],
      date_of_birth: ['',Validators.required],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      isverified: [1],
      password: ['',Validators.required],
      confirmpassword: ['',Validators.required]
    // },{
      // validator: MustMatch('password', 'confirmpassword')
          });
  }


  get f() { return this.signupForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }
    // console.log("1");
    this.signup();
    this.route.navigateByUrl('/alumni');

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value))
}


  
  signup() {
    console.log("Data before*****", this.signupForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.signupForm.value).subscribe((data: Array<any>) => {
      // console.log("Data After*****", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }
}

