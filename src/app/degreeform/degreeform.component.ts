import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-degreeform',
  templateUrl: './degreeform.component.html',
  styleUrls: ['./degreeform.component.css']
})
export class DegreeformComponent implements OnInit {

  degreeForm: FormGroup;
  // url = 'http://localhost:9800/degreeform';
  url= 'http://localhost:9800/degreeform';
  // url2= 'http://localhost:9800/degreeform2';
  // url3= 'http://localhost:9800/degreeform3';

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }
  ngOnInit() {
    this.degreeForm = this.formBuilder.group({
      end_year: [''],
      batch_id: [''],
      program_name: ['2'],
      specialization_name: ['2'],
      
      });
  }
  degreeform() {
    console.log("Data before***", this.degreeForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.degreeForm.value).subscribe((data: Array<any>) => {
      console.log("Data After***", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
     
  }
}
