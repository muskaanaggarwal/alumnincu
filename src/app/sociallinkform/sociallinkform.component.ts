import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, RequiredValidator } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Sociallinkmodel } from './slink.model';
import { Router } from '@angular/router';
import { JobUserModel } from './job_user.model';
import { CommentStmt } from '@angular/compiler';

@Component({
  selector: 'app-sociallinkform',
  templateUrl: './sociallinkform.component.html',
  styleUrls: ['../addressform/addressform.component.css']
})
export class SociallinkformComponent implements OnInit {

  sociallinkForm: FormGroup;
  addressForm: FormGroup;
  jobForm: FormGroup;
  job2Form: FormGroup;
  degreeForm: FormGroup;
  personalForm: FormGroup;
  jobUser: JobUserModel = new JobUserModel;
  job2User: JobUserModel = new JobUserModel;

  // for (var attrname in sociallinkform) {personalform[attrname]=sociallinkform[attrname];}

  personal_details_url = 'http://localhost:9800/personal_detailsform';
  address_url = 'http://localhost:9800/addressform';
  job_url = 'http://localhost:9800/jobform';
  job2_url = 'http://localhost:9800/job2form';
  degree_url = 'http://localhost:9800/degreeform';

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
    }
    this.sociallinkForm = this.formBuilder.group({
      facebook: [''],
      linkedin: [''],
      twitter: [''],
    });
    if (this.dataService.sociallinkForm) {
      this.sociallinkForm = this.dataService.sociallinkForm;
    }
    if (this.dataService.addressForm) {
      this.addressForm = this.dataService.addressForm;
    }
    if (this.dataService.jobForm) {
      this.jobForm = this.dataService.jobForm;
    }
    if (this.dataService.job2Form) {
      this.job2Form = this.dataService.job2Form;
    }
    if (this.dataService.personalForm) {
      this.personalForm = this.dataService.personalForm;
    }
    if (this.dataService.degreeForm) {
      this.degreeForm = this.dataService.degreeForm;
    }
  }
  ngOnDestroy() {
    this.dataService.sociallinkForm = this.sociallinkForm;
  }
  sociallinkform() {
    this.postAddress();
    this.postJob(this.jobForm);
    this.postJob(this.job2Form);
    this.postPersonalDetails();
  }
  postAddress() {
    this.addressForm.value['roll_no'] = this.dataService.user['roll_no'];
    this.dataService.alumniportalUser(this.address_url, this.addressForm.value).subscribe((data: Array<any>) => {
    },
      (error: any) => {
      });
  }
  postJob(jobForm: FormGroup) {
    if (jobForm.valid) {
      this.dataService.alumniportalUser(this.job_url, jobForm.value).subscribe((data: Array<any>) => {
        this.postJobUserRelation(data['company_id'], 1);
      },
        (error: any) => {
          console.log("Error in saving the record", error);
        });
    }
    else {
      console.log("Job form invalid");
    }
  }
  postJobUserRelation(company_id, campus_or_current: number) {
    let jobUser: JobUserModel = new JobUserModel;
    jobUser.company_id = company_id
    jobUser.roll_no = this.dataService.user['roll_no'];
    jobUser.campus_or_current = campus_or_current;
    this.dataService.alumniportalUser(this.job2_url, jobUser).subscribe((data: Array<any>) => {
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }
  postPersonalDetails() {
    this.personalForm.value['facebook'] = this.sociallinkForm.value['facebook'];
    this.personalForm.value['twitter'] = this.sociallinkForm.value['twitter'];
    this.personalForm.value['linkedin'] = this.sociallinkForm.value['linkedin'];
    this.personalForm.value['roll_no'] = this.dataService.user['roll_no'];
    this.personalForm.value['batch_id'] = this.degreeForm.value['batch_id'];
    this.personalForm.value['specialization_id'] = this.degreeForm.value['specialization_id'];
    this.dataService.alumniportalUser(this.personal_details_url, this.personalForm.value).subscribe((data: Array<any>) => {
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }
}