import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
@Component({
  selector: 'app-sociallinkform',
  templateUrl: './sociallinkform.component.html',
  styleUrls: ['./sociallinkform.component.css']
})
export class SociallinkformComponent implements OnInit {

  sociallinkForm: FormGroup;
  url = 'http://localhost:9800/sociallinkform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit() {
    this.sociallinkForm = this.formBuilder.group({
      facebook: [''],
     linkedin: [''],
      twitter: [''],
      
      });
  }
  sociallinkform() {
    console.log("Data before***", this.sociallinkForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.sociallinkForm.value).subscribe((data: Array<any>) => {
      console.log("Data After***", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }

}