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
