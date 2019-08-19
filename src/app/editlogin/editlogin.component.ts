import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
// import { MustMatch } from '../_helpers/must-match.validator';



@Component({
  selector: 'app-editlogin',
  templateUrl: './editlogin.component.html',
  styleUrls: ['./editlogin.component.css']
})
export class EditloginComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  url = 'http://localhost:9800/signup';



  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      oldpassword: [''],
      roll_no: [''],
      email: [''],
      // contact: [''],
      date_of_birth: [''],
      first_name: [''],
      last_name: [''],
      accepted: [''],
      isverified: [false],
      password: [''],
      confirmpassword: ['']
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
     this.route.navigateByUrl('/alumni');
}
  signup() {
    this.dataService.alumniportalUser(this.url, this.signupForm.value).subscribe((data: Array<any>) => {
    },
      (error: any) => {
        console.log(error);

      });
  }

}
