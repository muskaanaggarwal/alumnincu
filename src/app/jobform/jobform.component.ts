import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-jobform',
  templateUrl: './jobform.component.html',
  styleUrls: ['./jobform.component.css']
})
export class JobformComponent implements OnInit {

  jobForm: FormGroup;
  url = 'http://localhost:9800/jobform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
      designation: [''],
      company_name: [''],
      company_city: [''],
      website: [''],
     
      });
  }
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
