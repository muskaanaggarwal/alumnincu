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
  check: Boolean =false;
  submitted = false;
  signupForm: FormGroup;
  url = 'http://localhost:9800/signup';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.errorMessage = null;
    this.signupForm = this.formBuilder.group({
      
      oldpassword: [''],
   
      password: [''],
      confirmPassword: ['']
  }, {
      // validator: MustMatch('password', 'confirmPassword')
  });
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
    this.errorMessage = "";

    this.dataService.alumniportalUser(this.url, this.signupForm.value).subscribe((data: Array<any>) => {
    },
      (error: any) => {
      });
  }

}