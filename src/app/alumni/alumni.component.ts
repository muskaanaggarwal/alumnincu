import { DataserviceService } from './../dataservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit {
  loginForm: FormGroup;
  url= 'http://localhost:9800/loginform';
  errorMessage: boolean;
  formData: { "userName":"","password":""};


  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    })
  }

  reset(){
    this.loginForm.reset();
    this.errorMessage = false;
  }

  // login() {
  //   if (!this.loginForm.controls.userName.value || !this.loginForm.controls.password.value){
  //     this.errorMessage = true;
  //   } 
  //   this.formData.userName = this.loginForm.controls.userName.value;
  //   this.formData.password = this.loginForm.controls.password.value;
  //   this.dataService.login(this.formData).subscribe((data: Array<any>) => {
  //     if (data.length!=0 && data[0]['roll_no'] == this.formData.userName && data[0]['password'] == this.formData.password){
  //       this.errorMessage = false;
  //     }
  //   })

  // }

}
// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';

// import { AlertService, AuthenticationService } from 'DataserviceService';

// @Component({templateUrl: 'login.component.html'})
// export class LoginComponent implements OnInit {
//     loginForm: FormGroup;
//     loading = false;
//     submitted = false;
//     returnUrl: string;

//     constructor(
//         private formBuilder: FormBuilder,
//         private route: ActivatedRoute,
//         private router: Router,
//         private authenticationService: AuthenticationService,
//         private alertService: AlertService
//     ) {
//         // redirect to home if already logged in
//         if (this.authenticationService.currentUserValue) { 
//             this.router.navigate(['/']);
//         }
//     }

//     ngOnInit() {
//         this.loginForm = this.formBuilder.group({
//             username: ['', Validators.required],
//             password: ['', Validators.required]
//         });

//         // get return url from route parameters or default to '/'
//         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//     }

//     // convenience getter for easy access to form fields
//     get f() { return this.loginForm.controls; }

//     onSubmit() {
//         this.submitted = true;

//         // stop here if form is invalid
//         if (this.loginForm.invalid) {
//             return;
//         }

//         this.loading = true;
//         this.authenticationService.login(this.f.username.value, this.f.password.value)
//             .pipe(first())
//             .subscribe(
//                 data => {
//                     this.router.navigate([this.returnUrl]);
//                 },
//                 error => {
//                     this.alertService.error(error);
//                     this.loading = false;
//                 });
//     }
// }
