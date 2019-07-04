import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  alumniportalForm: FormGroup;
  url = 'http://localhost:9800/alumniportal';
  // title = 'alumnincu';
  
  // Register your dataservice using dependency injection
  
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }
  ngOnInit() {
    this.alumniportalForm = this.formBuilder.group({
      roll_no: [''],
      email: [''],
      contact: [''],
      date_of_birth: [''],
      first_name: [''],
      last_name: [''],
      isverified: [1],
      password: ['']
      });
  }
  
  alumniportal() {
    console.log("Data before*****", this.alumniportalForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.alumniportalForm.value).subscribe((data: Array<any>) => {
      console.log("Data After*****", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }
}

