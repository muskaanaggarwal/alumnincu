import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { NgForm, NgModel } from "@angular/forms";
import { Router } from '@angular/router';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  signupForm: FormGroup;
  url = 'http://localhost:9800/signup';
  errorMessage :string;
  
  // title = 'alumnincu';
  
  // Register your dataservice using dependency injection
  
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }
  ngOnInit() {
  
    this.signupForm = this.formBuilder.group({
      roll_no: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      email: [''],
      contact: [''],
      date_of_birth: [''],
      first_name: [''],
      last_name: [''],
      isverified: [1],
      password: ['']
      });
  }
  
  onSignup() {
    
    }

}