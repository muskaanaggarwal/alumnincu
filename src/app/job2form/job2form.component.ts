import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder ,Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Job2model } from './job2.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job2form',
  templateUrl: './job2form.component.html',
  styleUrls: ['../addressform/addressform.component.css']
})
export class Job2formComponent implements OnInit {
  job2Form: FormGroup;
  job2 = new Job2model();
  url = 'http://localhost:9800/job2form';
constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

ngOnInit() {
  if(!this.dataService.user){
    this.route.navigateByUrl('/alumni');
  }
this.job2Form = this.formBuilder.group({
  company_name: ['' , Validators.required],
  designation: [''],
  company_city: ['' , Validators.required],
  website: [''],
  });
  if(this.dataService.job2Form){
    this.job2Form = this.dataService.job2Form;
  }
}
ngOnDestroy() {
this.dataService.job2Form = this.job2Form;
}
// localjob2(){
//   let company_name: any = document.getElementById('company_name');
//   let designation: any = document.getElementById('designation');
//   let company_city: any = document.getElementById('company_city');
//   let website: any = document.getElementById('website');


//   if(company_name){
//     this.job2.company_name = company_name.value;
//   }
//   if(designation){
//     this.job2.designation = designation.value;
//   } if(company_city){
//     this.job2.company_city = company_city.value;
//   } if(website){
//     this.job2.website = website.value;
//   } 
//   console.log(this.job2);
//  }
job2form() {
console.log("Data before***", this.job2Form.value)
// execute the registerUser() given in the spring boot 
this.dataService.alumniportalUser(this.url, this.job2Form.value).subscribe((data: Array<any>) => {
  console.log("Data After***", data)
},
  (error: any) => {
    console.log("Error in saving the record", error);
  });
}

}