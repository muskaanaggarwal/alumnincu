import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { JobUserModel } from '../sociallinkform/job_user.model';
@Component({
  selector: 'app-editjob2',
  templateUrl: './editjob2.component.html',
  styleUrls: ['../editlogin/editlogin.component.css']
})
export class Editjob2Component implements OnInit {
  isSubmitted = false;
  job2Form: FormGroup;

  ask: boolean;
  submitted = false;
  successMessage: string;
  url = 'http://localhost:9800/jobform';
  job_url = 'http://localhost:9800/job2form';
  errorMessage: string;
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {

    this.job2Form = this.formBuilder.group({
      designation: [''],
      company_name: ['',Validators.required],
      company_city: [''],
      website: [''],
      campus_or_current: ['',Validators.required],


    });
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    if (this.dataService.job2Form) {
      this.job2Form = this.dataService.job2Form;
    }
    else {
      this.job2Form.value['campus_or_current'] = 0;
    }
  }
  ngOnDestroy() {
    this.dataService.job2Form = this.job2Form;
  }
  get myForm() {
    return this.job2Form.get('campus_or_current');
  }

  get f() { return this.job2Form.controls; }
  onSubmit() {
    this.isSubmitted = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.job2Form.invalid) {
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
    if (this.job2Form.valid) {
      if (this.job2Form.value['campus_or_current'] == 4) {
        this.job2Form.value['isselfemployed'] = 1;
      }
      else {
        this.job2Form.value['isselfemployed'] = 0;
      }
      this.dataService.alumniportalUser(this.url, this.job2Form.value).subscribe((data: Array<any>) => {
        this.postJobUserRelation(data['company_id']);
        // this.saved = true;
        this.successMessage = "Saved successfully! Click next to proceed"
      },
        (error: any) => {
          console.log(error);

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
    jobUser.campus_or_current = this.job2Form.value['campus_or_current'];
    this.dataService.alumniportalUser(this.job_url, jobUser).subscribe((data: Array<any>) => {
      this.successMessage = "Updated successfully!";

    },
      (error: any) => {
        this.errorMessage = error.message;
      });
  }
  proceed() {
    this.route.navigateByUrl('/job2form');
  }
}