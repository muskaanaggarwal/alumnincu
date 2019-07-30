import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Personalmodel } from './personal.model';


@Component({
  selector: 'app-personalform',
  templateUrl: './personalform.component.html',
  styleUrls: ['./personalform.component.css']
})
export class PersonalformComponent implements OnInit {

  personalForm: FormGroup;
personal= new Personalmodel();
  url = 'http://localhost:9800/personalform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      photo: [''],
      spouse_name: [''],
      roll_no: [''],
      anniversary_date: [''],
      });
  }
  localpersonal(){
    let photo: any = document.getElementById('photo');
    let spouse_name: any = document.getElementById('spouse_name');
    let anniversary: any = document.getElementById('anniversary');
  
  
    if(photo){
      this.personal.photo = photo.value;
    }
    if(spouse_name){
      this.personal.spouse_name = spouse_name.value;
    } if(anniversary){
      this.personal.anniversary = anniversary.value;
    } 
    console.log(this.personal);
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