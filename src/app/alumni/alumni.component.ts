import { DataserviceService } from './../dataservice.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit {
  loginForm: FormGroup;
  url = 'http://localhost:9800/loginform';
  errorMessage: String;
  submitted = false;
  isLoggedIn: boolean;

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.errorMessage = null;
    this.loginForm = this.formBuilder.group({
      roll_no: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  reset() {
    this.loginForm.reset();
    this.errorMessage = null;
  }

  get f() { return this.loginForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.login();
  }

  login() {
    this.loginForm.value['roll_no'] = this.loginForm.value['roll_no'].toUpperCase();
    this.dataService.login("http://localhost:9800/login", this.loginForm.value).subscribe((data: Array<any>) => {
      if (data.length) {
        if (data[0]["isverified"] != 1) {
          this.errorMessage = "Please wait till your account gets verified!";
        }
        else {
          this.dataService.user = data[0];
          this.dataService.get("http://localhost:9800/details?id=" + this.dataService.user['roll_no']).subscribe((data: Array<any>) => {
            this.isLoggedIn = true;
            if (data.length > 0) {
              this.dataService.details = data[0];
              this.route.navigateByUrl('/degreeform');
            }
            else {
              this.route.navigateByUrl('/degreeform');
            }
          });
        }
      }
      else {
        this.errorMessage = "Invalid roll number or password!";
      }
    },
      (error: any) => {
        this.errorMessage = "Something went wrong!\n" + error['message'];
      });
  }

}