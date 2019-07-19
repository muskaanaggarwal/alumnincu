import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-job2form',
  templateUrl: './job2form.component.html',
  styleUrls: ['./job2form.component.css']
})
export class Job2formComponent implements OnInit {
  job2Form: FormGroup;
  url = 'http://localhost:9800/job2form';
constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }

ngOnInit() {
this.job2Form = this.formBuilder.group({
  company_name: [''],
  designation: [''],
  company_city: [''],
  website: [''],
  });
}
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