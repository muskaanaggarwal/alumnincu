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
  errorMessage: String;

  // for (var attrname in sociallinkform) {personalform[attrname]=sociallinkform[attrname];}

  url = 'http://localhost:9800/personal_detailsform';

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.sociallinkForm = this.formBuilder.group({
      facebook: [''],
      linkedin: [''],
      twitter: [''],
    });
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    this.errorMessage = null;
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
    this.errorMessage = null;
    this.postPersonalDetails();
    if(!this.errorMessage){
      this.route.navigateByUrl('/dashboard');
    }
  }
  postPersonalDetails() {
    if(this.personalForm.valid){
      this.personalForm.value['facebook'] = this.sociallinkForm.value['facebook'];
      this.personalForm.value['twitter'] = this.sociallinkForm.value['twitter'];
      this.personalForm.value['linkedin'] = this.sociallinkForm.value['linkedin'];
      this.personalForm.value['roll_no'] = this.dataService.user['roll_no'];
      this.personalForm.value['batch_id'] = this.degreeForm.value['batch_id'];
      this.personalForm.value['specialization_id'] = this.degreeForm.value['specialization_id'];
      this.dataService.alumniportalUser(this.url, this.personalForm.value).subscribe((data: Array<any>) => {
      },
        (error: any) => {
          this.errorMessage = error.message;
        });
    }
    else{
      this.errorMessage = "Form Invalid!"
    }
  }
}