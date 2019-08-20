import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editpersonal',
  templateUrl: './editpersonal.component.html',
  styleUrls: ['../editlogin/editlogin.component.css']
})
export class EditpersonalComponent implements OnInit {

  personalForm: FormGroup;
  errorMessage: string;
  saved: boolean;
  successMessage: string;
  url = 'http://localhost:9800/personal_detailsform';
  submitted=false;



  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      facebook: [''],
      linkedin: [''],
      twitter: [''],
      spouse_name: [''],
      anniversary_date: [''],

    });
  }
  get f() { return this.personalForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.personalForm.invalid) {
      return;
    }
    this.postPersonalDetails();
}


  postPersonalDetails() {
      this.errorMessage = "";
      if (this.personalForm.valid) {
        // this.personalForm.value['roll_no'] = this.dataService.user['roll_no'];
        // this.personalForm.value['batch_id'] = this.dataService.degreeForm.value['batch_id'];
        // this.personalForm.value['specialization_id'] = this.dataService.degreeForm.value['specialization_id'];
        this.dataService.alumniportalUser(this.url, this.personalForm.value).subscribe((data: Array<any>) => {
          this.saved = true;
          this.successMessage = "Saved successfully! Click next to proceed";
        },
          (error: any) => {
            // this.errorMessage = error.message;
            console.log(error);
          });
      }
      // else {
      //   this.saved = false;
      //   this.errorMessage = "Please fill all the details";
      // }
    }
  }


