import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Jobmodel } from './job.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-jobform',
  templateUrl: './jobform.component.html',
  styleUrls: ['./jobform.component.css']
})
export class JobformComponent implements OnInit {
  job = new Jobmodel();
  jobForm: FormGroup;
  url = 'http://localhost:9800/jobform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    if(!this.dataService.user){
      this.route.navigateByUrl('/alumni');
    }
    this.jobForm = this.formBuilder.group({
      designation: [''],
      company_name: [''],
      company_city: [''],
      website: [''],
     
      });
      if(this.dataService.jobForm){
        this.jobForm = this.dataService.jobForm;
      }
  }
  ngOnDestroy() {
    this.dataService.jobForm = this.jobForm;
  }
  // localjob(){
  //   let company_name: any = document.getElementById('company_name');
  //   let designation: any = document.getElementById('designation');
  //   let company_city: any = document.getElementById('company_city');
  //   let website: any = document.getElementById('website');


  //   if(company_name){
  //     this.job.company_name = company_name.value;
  //   }
  //   if(designation){
  //     this.job.designation = designation.value;
  //   } if(company_city){
  //     this.job.company_city = company_city.value;
  //   } if(website){
  //     this.job.website = website.value;
  //   } 
  //   console.log(this.job);
  //  }

  
  jobform() {
    console.log("Data before***", this.jobForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.jobForm.value).subscribe((data: Array<any>) => {
      console.log("Data After***", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }
}