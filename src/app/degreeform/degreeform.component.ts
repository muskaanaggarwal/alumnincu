import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-degreeform',
  templateUrl: './degreeform.component.html',
  styleUrls: ['./degreeform.component.css']
})
export class DegreeformComponent implements OnInit {
  school: string = 'SOET'

  degreeForm: FormGroup;

//   schools: object = {
//     "SOET": {
//       "B.Tech - Computer Science & Engineering (CSE)": "B.Tech - Computer Science & Engineering (CSE)",
//       	"B.Tech - Electronics & Communication Engineering (ECE)": 	"B.Tech - Electronics & Communication Engineering (ECE)",
//         "B.Tech - Civil Engineering (CE)": "B.Tech - Civil Engineering (CE)" ,
//         "B.Tech - Mechanical Engineering (ME)":	"B.Tech - Mechanical Engineering (ME)",
//         "M.Tech - Computer Science & Engineering (CSE)":"	M.Tech - Computer Science & Engineering (CSE)",
//         "M.Tech - Civil Engineering (CE)":	"M.Tech - Civil Engineering (CE)",
//         "M.Tech - Mechanical Engineering (ME)":"M.Tech - Mechanical Engineering (ME)",
//         "Ph.D.":	"Ph.D."
          
//     },
//     "School Of Applied Sciences": {
//       "Bachelor of Science (B.Sc.) Mathematics (Hons.)": "Bachelor of Science (B.Sc.) Mathematics (Hons.)",

//       "Bachelor of Science (B.Sc.) Physics (Hons.)": "Bachelor of Science (B.Sc.) Physics (Hons.)",

//       "Master of Science (M.Sc.) Mathematics": "Master of Science (M.Sc.) Mathematics",

//       "Ph.D.": "Ph.D." 


//     },
//     "School Of Management": {
//       "Bachelor of Business Administration (BBA)":"Bachelor of Business Administration (BBA)",

// "Bachelor of Commerce (B.Com) (Hons.)":"Bachelor of Commerce (B.Com) (Hons.)",

// "Bachelor of Arts (BA) - Economics (Hons.)":"Bachelor of Arts (BA) - Economics (Hons.)",

// "Bachelor of Arts (BA) - Psychology (Hons.)":"Bachelor of Arts (BA) - Psychology (Hons.)",

// "Master of Business Administration (MBA)":"Master of Business Administration (MBA)",

// "Ph.D.":"Ph.D."
//     },
//     "School Of Law":{
//       "Bachelor of Laws - BBA.LL.B(Hons.)":"Bachelor of Laws - BBA.LL.B(Hons.)",

// "Master of Laws (LLM)":"Master of Laws (LLM)",

// 	"Ph.D.":	"Ph.D."

  //   }
  // }
  // url = 'http://localhost:9800/degreeform';
  url= 'http://localhost:9800/degreeform';
  // url2= 'http://localhost:9800/degreeform2';
  // url3= 'http://localhost:9800/degreeform3';

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }
  ngOnInit() {
  
  
    this.degreeForm = this.formBuilder.group({
      
      // specialization_id: [''],
   
      end_year: [''],
      start_year:[''],
      batch_id: [''],
      school_name: [''],
      // school_id: [''],
      program_id: [''],
      program_name: [''],
      specialization_name: ['']       
      });
      
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
