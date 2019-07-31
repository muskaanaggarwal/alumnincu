import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Degreemodel } from './degreemodel.model';

@Component({
  selector: 'app-degreeform',
  templateUrl: './degreeform.component.html',
  styleUrls: ['./degreeform.component.css']
})
export class DegreeformComponent implements OnInit {
  school: string = 'SOET'
  degree = new Degreemodel();

  degreeForm: FormGroup;
  url= 'http://localhost:9800/degreeform';
  
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) {
    
   }
  ngOnInit() {
      this.degreeForm = this.formBuilder.group({
      school_name: [''],
      program_name: [''],
      roll_no: [''],
      school_id: [''],
      specialization_name: [''],
      batch_id:[''],
      });
      if(this.dataService.degreeForm){
        this.degreeForm = this.dataService.degreeForm;
      }
  }
  ngOnDestroy() {
    this.dataService.degreeForm = this.degreeForm;
  }

  localdegree(){
    let batch: any = document.getElementById('batch_id');
    let roll_no: any = document.getElementById('roll_no');
    let school: any = document.getElementById('school');
    let program: any = document.getElementById('program');
    let specialization: any = document.getElementById('specialization');

    if(batch){
      this.degree.batch = batch.value;
    }
    if(roll_no){
      this.degree.roll_no = roll_no.value;
    } if(school){
      this.degree.school = school.value;
    } if(program){
      this.degree.program = program.value;
    } if(specialization){
      this.degree.specialization = specialization.value;
    }
    console.log(this.degree);
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
    this.dataService.degreeformUser(this.url, this.degreeForm.value).subscribe((data: Array<any>) => {
      console.log("Data After***", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
     
  }
}
