import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, RequiredValidator } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Sociallinkmodel } from './slink.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sociallinkform',
  templateUrl: './sociallinkform.component.html',
  styleUrls: ['./sociallinkform.component.css']
})
export class SociallinkformComponent implements OnInit {

  sociallinkForm: FormGroup;
  addressForm: FormGroup;
  jobForm: FormGroup;
  job2Form: FormGroup;
  degreeForm: FormGroup;
  personalForm: FormGroup;

  // for (var attrname in sociallinkform) {personalform[attrname]=sociallinkform[attrname];}

  // social = new Sociallinkmodel();
  personal_details_url = 'http://localhost:9800/personal_detailsform';
  address_url = 'http://localhost:9800/addressform';
  job_url = 'http://localhost:9800/jobform';
  job2_url = 'http://localhost:9800/job2form';
  // degree_url = 'http://localhost:9800/degreeform';

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    if(!this.dataService.user){
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
    // if (this.dataService.degreeForm) {
    //   this.personalForm = this.dataService.degreeForm;
    // }
  }
  ngOnDestroy() {
    this.dataService.sociallinkForm = this.sociallinkForm;
    this.dataService.addressForm = this.addressForm;
    this.dataService.jobForm = this.jobForm;
    this.dataService.job2Form = this.job2Form;
    // this.dataService.degreeForm = this.degreeForm;
    this.dataService.personalForm = this.personalForm;
  }
  // localsocial() {
  //   let facebook: any = document.getElementById('facebook');
  //   let linkedin: any = document.getElementById('linkedin');
  //   let twitter: any = document.getElementById('twitter');
  //   if (facebook) {
  //     this.social.facebook = facebook.value;
  //   }
  //   if (linkedin) {
  //     this.social.linkedin = linkedin.value;
  //   } if (twitter) {
  //     this.social.twitter = twitter.value;
  //   }
  //   console.log(this.social);
  // }
  sociallinkform() {
    this.dataService.sociallinkForm = this.sociallinkForm;
    this.dataService.addressForm = this.addressForm;
    this.dataService.jobForm = this.jobForm;
    this.dataService.job2Form = this.job2Form;
    this.dataService.personalForm = this.personalForm;
    // this.dataService.degreeForm = this.degreeForm;

    console.log(this.dataService.degreeForm);
    console.log(this.dataService.addressForm.value);
    console.log(this.dataService.jobForm.value);
    console.log(this.dataService.job2Form.value);
    console.log(this.dataService.personalForm.value);
    console.log(this.dataService.sociallinkForm.value);

    this.dataService.sociallinkForm.value['roll_no'] = this.dataService.user['roll_no'];
    this.dataService.addressForm.value['roll_no'] = this.dataService.user['roll_no'];
    // this.dataService.personalForm.value['roll_no'] = this.dataService.sociallinkForm.value['roll_no'];


   if (this.dataService.addressForm.valid)
      this.dataService.alumniportalUser(this.address_url, this.dataService.addressForm.value).subscribe((data: Array<any>) => {
        console.log("Data After***", data)
      },
        (error: any) => {
          console.log("Error in saving the record", error);
        });
    else {
      console.log('form not valid');
    }

    if (this.dataService.jobForm.valid)
      this.dataService.alumniportalUser(this.job_url, this.dataService.jobForm.value).subscribe((data: Array<any>) => {
        console.log("Data After***", data)
      },
        (error: any) => {
          console.log("Error in saving the record", error);
        });
    else {
      console.log('form not valid');
    }
    if (this.dataService.job2Form.valid)
      this.dataService.alumniportalUser(this.job2_url, this.dataService.job2Form.value).subscribe((data: Array<any>) => {
        console.log("Data After***", data)
      },
        (error: any) => {
          console.log("Error in saving the record", error);
        });
    else {
      console.log('form not valid');
    }
    
    // if (this.dataService.sociallinkForm.valid)
    //   this.dataService.alumniportalUser(this.personal_details_url, this.dataService.sociallinkForm.value).subscribe((data: Array<any>) => {
    //     console.log("Data After***", data)
    //   },
    //     (error: any) => {
    //       console.log("Error in saving the record", error);
    //     });
    // else {
    //   console.log('form not valid');
    // }


    // if (this.dataService.degreeForm.valid)
    //   this.dataService.alumniportalUser(this.degree_url, this.dataService.degreeForm.value).subscribe((data: Array<any>) => {
    //     console.log("Data After***", data)
    //   },
    //     (error: any) => {
    //       console.log("Error in saving the record", error);
    //     });
    // else {
    //   console.log('form not valid');
    // }
    if (this.dataService.personalForm.valid && this.dataService.sociallinkForm.valid)
      this.dataService.alumniportalUser(this.personal_details_url, this.dataService.personalForm.value && this.dataService.sociallinkForm.valid).subscribe((data: Array<any>) => {
        console.log("Data After***", data)
      },
        (error: any) => {
          console.log("Error in saving the record", error);
        });
    else {
      console.log('form not valid');
    }
  }
}