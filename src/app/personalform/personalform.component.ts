import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-personalform',
  templateUrl: './personalform.component.html',
  styleUrls: ['./personalform.component.css']
})
export class PersonalformComponent implements OnInit {

  personalForm: FormGroup;
  url = 'http://localhost:9800/personalform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      photo: [''],
      spouse_name: [''],
      anniversary_date: [''],
      });
  }
  personalform() {
    console.log("Data before***", this.personalForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.personalForm.value).subscribe((data: Array<any>) => {
      console.log("Data After***", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }

}