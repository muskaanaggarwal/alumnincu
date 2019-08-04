import { DataserviceService } from './../dataservice.service';
import { Component, OnInit } from '@angular/core';
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
  errorMessage: string;
  submitted = false;



  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.errorMessage = null;
    this.loginForm = this.formBuilder.group({
      roll_no: ['',[Validators.required, Validators.minLength(6)]],
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
    //  this.route.navigateByUrl('/degreeform');
  }

  login() {
      this.dataService.login("http://localhost:9800/login", this.loginForm.value).subscribe((data: Array<any>) => {
        if (data.length) {
          if (data[0]["isverified"] != 1) {
            this.errorMessage = "Please wait till your account gets verified!";
          }
          else {
            this.dataService.user = data[0];
            this.route.navigateByUrl('/degreeform');
          }
        }
        else {
          this.errorMessage = "Invalid roll number or password!";
        }
      },
        (error: any) => {
          this.errorMessage = "Something went wrong!\n" + error['message'];
          console.log("Error in logging in", error);
        });
    }
  
}