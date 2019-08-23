import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { JobUserModel } from '../sociallinkform/job_user.model';


@Component({
  selector: 'app-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['../editlogin/editlogin.component.css']
})
export class EditjobComponent implements OnInit {
    isSubmitted = false;
    jobForm: FormGroup;

    ask: boolean;
    submitted = false;  
    successMessage: string;
    url = 'http://localhost:9800/jobform';
    job_url = 'http://localhost:9800/job2form';
    errorMessage: string;
    constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }
  
    ngOnInit() {
      
      this.jobForm = this.formBuilder.group({
        designation: [''],
        company_name: [''],
        company_city: [''],
        website: [''],
        campus_or_current: [''],
        isselfemployed:['0'],
        
  
      });
      if (!this.dataService.user) {
        this.route.navigateByUrl('/alumni');
        return;
      }
      if (this.dataService.jobForm) {
        this.jobForm = this.dataService.jobForm;
      }
      else {
        this.jobForm.value['campus_or_current'] = 0;
      }
    }
    ngOnDestroy() {
      this.dataService.jobForm = this.jobForm;
    }
    get myForm() {
      return this.jobForm.get('campus_or_current');
    }
    
    get f() { return this.jobForm.controls; }
    onSubmit() {
      this.isSubmitted = true;
      this.submitted = true;
  
      // stop here if form is invalid
      if (this.jobForm.invalid) {
        return;
      }
  this.postJob()
  }
    // checkSaved() {
    //   if (!this.saved) {
    //     this.errorMessage = "Please click save before you proceed!"
    //   }
    //   else {
    //     this.route.navigateByUrl('/job2form');
    //   }
    // }
  
  
    postJob() {
      //if (!this.saved) {
        this.errorMessage = "";
        if (this.jobForm.valid) {
          this.dataService.alumniportalUser(this.url, this.jobForm.value).subscribe((data: Array<any>) => {
            this.postJobUserRelation(data['company_id']);
           // this.saved = true;
            this.successMessage = "Saved successfully! Click next to proceed"
          },
            (error: any) => {
              this.errorMessage = error.message;
            });
        }
        else {
         // this.saved = false;
          this.errorMessage = 'Please fill all the details';
        }
      //}
    }
    postJobUserRelation(company_id) {
      let jobUser: JobUserModel = new JobUserModel;
      jobUser.company_id = company_id
      jobUser.roll_no = this.dataService.user['roll_no'];
      jobUser.campus_or_current = this.jobForm.value['campus_or_current'];
      this.dataService.alumniportalUser(this.job_url, jobUser).subscribe((data: Array<any>) => {
      },
        (error: any) => {
          this.errorMessage = error.message;
        });
    }
    proceed() {
      this.route.navigateByUrl('/job2form');
    }
  }