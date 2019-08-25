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
  successMessage: string;
  url = 'http://localhost:9800/personal_detailsform';
  personalurl = "http://localhost:9800/personal/details?id=";
  details: object;
 batch_id: string;
 specialization_id:number;


  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      facebook: [''],
      linkedin: [''],
      twitter: [''],
      spouse_name: [''],
      anniversary_date: [''],

    });

    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    else {
      this.dataService.get("http://localhost:9800/details?id=" + this.dataService.user['roll_no']).subscribe((data: Array<any>) => {
        this.details = data[0];
      },
        (error) => {
          // console.log(error);
        });
    }
    
    this.dataService.get(this.personalurl + this.dataService.user['roll_no']).subscribe((data: Array<any>) => {
      this.personalForm.patchValue({
        spouse_name: data['spouse_name'],
        anniversary_date: data['anniversary_date'],
        facebook: data['facebook'],
        twitter: data['twitter'],
        linkedin: data['linkedin'],
       


      } );
      this.batch_id = data['batch_id'];
      this.specialization_id = data['specialization_id'];
      
    },
    (error: any) => {
      // console.log("Error in fetching details", error);
    });
    if (this.dataService.personalForm) {
      this.personalForm = this.dataService.personalForm;
    }
  }
  ngOnDestroy() {
    this.dataService.personalForm = this.personalForm;
  }

  postPersonalDetails() {
    if (this.personalForm.valid) {
      this.personalForm.value['roll_no'] = this.dataService.user['roll_no'];
      this.personalForm.value['batch_id'] = this.details['batch_id'];
      this.personalForm.value['specialization_id'] = this.details['specialization_id'];
      this.personalForm.value['batch_id'] = this.batch_id;
      this.personalForm.value['specialization_id'] = this.specialization_id;
      this.dataService.alumniportalUser(this.url, this.personalForm.value).subscribe((data: Array<any>) => {
        this.successMessage = "Saved successfully! Click next to proceed";
        // console.log(this.personalForm.value);
      },
        (error: any) => {
          this.errorMessage = error.message;
          // console.log(error);
        });
    }
    else {
      this.errorMessage = "Please fill all the details";
    }
  }
}


