import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Degreeform } from './degreemodel.model';

@Component({
  selector: 'app-degreeform',
  templateUrl: './degreeform.component.html',
  styleUrls: ['./degreeform.component.css']
})
export class DegreeformComponent implements OnInit {
  school: string = 'SOET'
  a = new Degreeform();

  degreeForm: FormGroup;
  url= 'http://localhost:9800/degreeform';
  
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) {
    
   }
  ngOnInit() {
      this.degreeForm = this.formBuilder.group({
      school_name: [''],
      program_name: [''],
      school_id: [''],
      // specialization_name: [''],
      batch_id:[''],
      });
      
  }

  saveSoFar(){
    let branch: any = document.getElementById('batch_id');
    if(branch){
      this.a.batch = branch.value;
      console.log(this.a);
    }
  }

  onSelect(key: string) {
    console.log(key);
    this.school = key;
  }
  onProgram(key: string) {
    console.log(key);
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
