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
      
      password: [''],
      confirmpassword: ['']
  });
  }

  
  get f() { return this.signupForm.controls; }
  onSubmit() {
    this.submitted = true;
    console.log(1)

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.signup();
}
  signup() {
    this.dataService.alumniportalUser(this.url, this.signupForm.value).subscribe((data: Array<any>) => {
    },
      (error: any) => {
        console.log(error);

      });
  }

}
