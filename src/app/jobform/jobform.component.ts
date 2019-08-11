import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Jobmodel } from './job.model';
import { Router } from '@angular/router';
import { JobUserModel } from '../sociallinkform/job_user.model';


@Component({
  selector: 'app-jobform',
  templateUrl: './jobform.component.html',
  styleUrls: ['../addressform/addressform.component.css']
})
export class JobformComponent implements OnInit {
  job = new Jobmodel();
  jobForm: FormGroup;
  saved:boolean;
  successMessage: string;
  url = 'http://localhost:9800/jobform';
  job_url = 'http://localhost:9800/job2form';
  errorMessage: string;
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
      designation: [''],
      company_name: ['', Validators.required],
      company_city: [''],
      website: [''],
     
      });
    if(!this.dataService.user){
      this.route.navigateByUrl('/alumni');
      return;
    }
      if(this.dataService.jobForm){
        this.jobForm = this.dataService.jobForm;
      }
  }
  ngOnDestroy() {
    this.dataService.jobForm = this.jobForm;
  }
  checkSaved(){
    if(!this.saved){
      this.errorMessage = "Please click save before you proceed!"
    }
    else{
      this.route.navigateByUrl('/job2form');
    }
  }

  
  postJob() {
    if(!this.saved){
    this.errorMessage = "";
    if (this.jobForm.valid) {
      this.dataService.alumniportalUser(this.url, this.jobForm.value).subscribe((data: Array<any>) => {
        this.postJobUserRelation(data['company_id'], 0);
        this.saved=true;
        this.successMessage = "Saved successfully! Click next to proceed"
      },
        (error: any) => {
          this.errorMessage = error.message;
        });
    }
    else {
      this.saved=false;
      this.errorMessage = 'Form invalid';
    }
  }
  }
  postJobUserRelation(company_id, campus_or_current: number) {
    let jobUser: JobUserModel = new JobUserModel;
    jobUser.company_id = company_id
    jobUser.roll_no = this.dataService.user['roll_no'];
    jobUser.campus_or_current = campus_or_current;
    this.dataService.alumniportalUser(this.job_url, jobUser).subscribe((data: Array<any>) => {
    },
      (error: any) => {
        this.errorMessage = error.message;
      });
  }
}