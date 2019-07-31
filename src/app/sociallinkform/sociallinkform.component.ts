import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Sociallinkmodel } from './slink.model';

@Component({
  selector: 'app-sociallinkform',
  templateUrl: './sociallinkform.component.html',
  styleUrls: ['./sociallinkform.component.css']
})
export class SociallinkformComponent implements OnInit {

  sociallinkForm: FormGroup;
  social = new Sociallinkmodel();
  address_url = 'http://localhost:9800/personalform';
  social_url = 'http://localhost:9800/sociallinkform';
  // social_url = 'http://localhost:9800/sociallinkform';
  // social_url = 'http://localhost:9800/sociallinkform';
  // social_url = 'http://localhost:9800/sociallinkform';
  // social_url = 'http://localhost:9800/sociallinkform';

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit() {
    this.sociallinkForm = this.formBuilder.group({
      facebook: [''],
      linkedin: ['', Validators.required],
      twitter: [''],

    });
    if (this.dataService.sociallinkForm) {
      this.sociallinkForm = this.dataService.sociallinkForm;
    }
  }
  ngOnDestroy() {
    this.dataService.sociallinkForm = this.sociallinkForm;
  }
  localsocial() {
    let facebook: any = document.getElementById('facebook');
    let linkedin: any = document.getElementById('linkedin');
    let twitter: any = document.getElementById('twitter');
    if (facebook) {
      this.social.facebook = facebook.value;
    }
    if (linkedin) {
      this.social.linkedin = linkedin.value;
    } if (twitter) {
      this.social.twitter = twitter.value;
    }
    console.log(this.social);
  }
  sociallinkform() {
    this.dataService.sociallinkForm = this.sociallinkForm;
    console.log(this.dataService.degreeForm);
    // console.log(this.dataService.addressForm.value);
    // console.log(this.dataService.jobForm.value);
    // console.log(this.dataService.job2Form.value);
    // console.log(this.dataService.personalForm.value);
    // console.log(this.dataService.sociallinkForm.value);

    this.dataService.sociallinkForm.value['roll_no'] = this.dataService.degreeForm.value['roll_no'];
    console.log(this.dataService.sociallinkForm.value);
    if (this.dataService.sociallinkForm.valid)
      this.dataService.alumniportalUser(this.social_url, this.dataService.sociallinkForm.value).subscribe((data: Array<any>) => {
        console.log("Data After***", data)
      },
        (error: any) => {
          console.log("Error in saving the record", error);
        });
    else{
      console.log('form not valid');
    }

    //   this.dataService.alumniportalUser(this.url, this.dataService.addressForm.value).subscribe((data: Array<any>) => {
    //     console.log("Data After***", data)
    //   },
    //     (error: any) => {
    //       console.log("Error in saving the record", error);
    //     });

    //   this.dataService.alumniportalUser(this.url, this.dataService.jobForm.value).subscribe((data: Array<any>) => {
    //     console.log("Data After***", data)
    //   },
    //     (error: any) => {
    //       console.log("Error in saving the record", error);
    //     });

    //   this.dataService.alumniportalUser(this.url, this.dataService.job2Form.value).subscribe((data: Array<any>) => {
    //     console.log("Data After***", data)
    //   },
    //     (error: any) => {
    //       console.log("Error in saving the record", error);
    //     });

    //   this.dataService.alumniportalUser(this.url, this.dataService.personalForm.value).subscribe((data: Array<any>) => {
    //     console.log("Data After***", data)
    //   },
    //     (error: any) => {
    //       console.log("Error in saving the record", error);
    //     });

    //   this.dataService.alumniportalUser(this.url, this.dataService.sociallinkForm.value).subscribe((data: Array<any>) => {
    //     console.log("Data After***", data)
    //   },
    //     (error: any) => {
    //       console.log("Error in saving the record", error);
    //     });
  }
}