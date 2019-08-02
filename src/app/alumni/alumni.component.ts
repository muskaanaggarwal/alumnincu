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
  url= 'http://localhost:9800/loginform';
  errorMessage: string;


  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.errorMessage = null;
    this.loginForm = this.formBuilder.group({
      roll_no: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  reset(){
    this.loginForm.reset();
    this.errorMessage = null;
  }

  login() {
    if (this.loginForm.valid){
      this.dataService.login("http://localhost:9800/login", this.loginForm.value).subscribe((data: Array<any>) => {
        if (data.length){
          if(data[0]["isverified"] != 1){
            this.errorMessage = "Please wait till your account gets verified!";
          }
          else{
            this.dataService.user = data[0];
            this.route.navigateByUrl('/degreeform');
          }
        }
        else{
          this.errorMessage = "Invalid roll number or password!";
        }
      },
        (error: any) => {
          this.errorMessage = "Something went wrong!\n"+error['message'];
          console.log("Error in logging in", error);
        });
      }
    else{
      this.errorMessage = "Form invalid!";
    }
  }
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
