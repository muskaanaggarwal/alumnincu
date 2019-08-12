import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Job2model } from './job2.model';
import { Router } from '@angular/router';
import { JobUserModel } from '../sociallinkform/job_user.model';

@Component({
  selector: 'app-job2form',
  templateUrl: './job2form.component.html',
  styleUrls: ['../addressform/addressform.component.css', './job2form.component.css']
})
export class Job2formComponent implements OnInit {
  job2Form: FormGroup;
  job2 = new Job2model();
  url = 'http://localhost:9800/jobform';
  job_url = 'http://localhost:9800/job2form';
  errorMessage: string;
  saved: boolean;
  successMessage: string;
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.job2Form = this.formBuilder.group({
      company_name: ['', Validators.required],
      designation: [''],
      company_city: [''],
      website: [''],
      campus_or_current: ['', Validators.required],
    });
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    if (this.dataService.job2Form) {
      this.job2Form = this.dataService.job2Form;
    }
  }
  ngOnDestroy() {
    this.dataService.job2Form = this.job2Form;
  }
  checkSaved() {
    if (!this.saved) {
      this.errorMessage = "Please click save before you proceed!"
    }
    else {
      this.route.navigateByUrl('/addressform');
    }
  }
  postJob() {
    this.errorMessage = "";
    if (this.job2Form.valid) {
      this.dataService.alumniportalUser(this.url, this.job2Form.value).subscribe((data: Array<any>) => {
        this.postJobUserRelation(data['company_id']);
        this.saved = true;
        this.successMessage = "Saved successfully! Click next to proceed"
      },
        (error: any) => {
          this.errorMessage = error.message;
        });
    }
    else {
      this.errorMessage = 'Form invalid';
      this.saved = false;
    }
  }
  postJobUserRelation(company_id) {
    let jobUser: JobUserModel = new JobUserModel;
    jobUser.company_id = company_id
    jobUser.roll_no = this.dataService.user['roll_no'];
    jobUser.campus_or_current = this.job2Form.value['campus_or_current'];
    this.dataService.alumniportalUser(this.job_url, jobUser).subscribe((data: Array<any>) => {
    },
      (error: any) => {
        this.errorMessage = error.message;
      });
  }

}