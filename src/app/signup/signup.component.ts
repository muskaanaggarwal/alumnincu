import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { NgForm, NgModel } from "@angular/forms";



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  signupForm: FormGroup;
  url = 'http://localhost:9800/signup';
  // title = 'alumnincu';
  
  // Register your dataservice using dependency injection
  
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      roll_no: ['',Validators.required],
      email: [''],
      contact: [''],
      date_of_birth: [''],
      first_name: [''],
      last_name: [''],
      isverified: [1],
      password: ['']
      });
  }
  
  signup() {
    console.log("Data before*****", this.signupForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.signupForm.value).subscribe((data: Array<any>) => {
      console.log("Data After*****", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }
}

