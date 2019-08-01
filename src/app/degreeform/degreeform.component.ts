import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Degreemodel } from './degreemodel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-degreeform',
  templateUrl: './degreeform.component.html',
  styleUrls: ['./degreeform.component.css']
})
export class DegreeformComponent implements OnInit {
  school: string = 'SOET'
  degree = new Degreemodel();

  degreeForm: FormGroup;

  schools: object = {
    "SOET": {
      "B.Tech - Computer Science & Engineering (CSE)": "B.Tech - Computer Science & Engineering (CSE)",
      "B.Tech - Electronics & Communication Engineering (ECE)": "B.Tech - Electronics & Communication Engineering (ECE)",
      "B.Tech - Civil Engineering (CE)": "B.Tech - Civil Engineering (CE)",
      "B.Tech - Mechanical Engineering (ME)": "B.Tech - Mechanical Engineering (ME)",
      "M.Tech - Computer Science & Engineering (CSE)": "	M.Tech - Computer Science & Engineering (CSE)",
      "M.Tech - Civil Engineering (CE)": "M.Tech - Civil Engineering (CE)",
      "M.Tech - Mechanical Engineering (ME)": "M.Tech - Mechanical Engineering (ME)",
      "Ph.D.": "Ph.D."

    },
    "School Of Applied Sciences": {
      "Bachelor of Science (B.Sc.) Mathematics (Hons.)": "Bachelor of Science (B.Sc.) Mathematics (Hons.)",

      "Bachelor of Science (B.Sc.) Physics (Hons.)": "Bachelor of Science (B.Sc.) Physics (Hons.)",

      "Master of Science (M.Sc.) Mathematics": "Master of Science (M.Sc.) Mathematics",

      "Ph.D.": "Ph.D."


    },
    "School Of Management": {
      "Bachelor of Business Administration (BBA)": "Bachelor of Business Administration (BBA)",

      "Bachelor of Commerce (B.Com) (Hons.)": "Bachelor of Commerce (B.Com) (Hons.)",

      "Bachelor of Arts (BA) - Economics (Hons.)": "Bachelor of Arts (BA) - Economics (Hons.)",

      "Bachelor of Arts (BA) - Psychology (Hons.)": "Bachelor of Arts (BA) - Psychology (Hons.)",

      "Master of Business Administration (MBA)": "Master of Business Administration (MBA)",

      "Ph.D.": "Ph.D."
    },
    "School Of Law": {
      "Bachelor of Laws - BBA.LL.B(Hons.)": "Bachelor of Laws - BBA.LL.B(Hons.)",

      "Master of Laws (LLM)": "Master of Laws (LLM)",

      "Ph.D.": "Ph.D."

    }
  }
  program: string = "B.Tech - Computer Science & Engineering (CSE)"
  programs: object = {
    "B.Tech - Computer Science & Engineering (CSE)": {
      "Data Science & AI": "Data Science & AI",

      "Full Stack": "Full Stack",

      "IOT": "IOT",

      "Cyber Security": "Cyber Security",

      "Game Tech, AR & VR": "Game Tech, AR & VR",

      "General": "General"

    },
    "B.Tech - Civil Engineering (CE)": {
      "General": "General"
    },
    "M.Tech - Civil Engineering (CE)": {
      "General": "General"
    },
    "B.Tech - Electronics & Communication Engineering (ECE)": {
      "	IoT": "IoT",

      "Embedded systems": "Embedded systems",

      "VLSI design": "VLSI design"

    },
    "	B.Tech - Mechanical Engineering (ME)": {
      "Thermal Engineering": "Thermal Engineering",

      "Mechanical Engineering Design": "Mechanical Engineering Design",
      "Industrial and Production Engineering": "Industrial and Production Engineering",

      "Automobile Engineering": "Automobile Engineering"
    },
    "M.Tech - Computer Science & Engineering (CSE)": {
      "Data Science & AI": "Data Science & AI",

      "Full Stack": "Full Stack",

      "IOT": "IT",

      "Cyber Security": "Cyber Security",

      "Game Tech, AR & VR": "Game Tech, AR & VR",

      "General": "General"

    },
    "M.Tech - Electronics & Communication Engineering (ECE)": {
      "IoT": "IoT",

      "Embedded systems": "Embedded systems",

      "VLSI design": "VLSI design"
    },
    "M.Tech - Mechanical Engineering (ME)": {
      "Thermal Engineering": "Thermal Engineering",

      "Mechanical Engineering Design": "Mechanical Engineering Design",

      "Industrial and Production Engineering": "Industrial and Production Engineering",

      "Automobile Engineering": "Automobile Engineering"
    }


  }
  url= 'http://localhost:9800/degreeform';
  
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) {
    
   }
  ngOnInit() {
    if(!this.dataService.user){
      this.route.navigateByUrl('/alumni');
    }
      this.degreeForm = this.formBuilder.group({
      school_name: [''],
      program_name: [''],
      // school_id: [''],
      specialization_name: [''],
      batch_id: [''],
    });
    if (this.dataService.degreeForm) {
      this.degreeForm = this.dataService.degreeForm;
    }
  }
  ngOnDestroy() {
    this.dataService.degreeForm = this.degreeForm;
  }

  // localdegree(){
  //   let batch: any = document.getElementById('batch_id');
  //   let roll_no: any = document.getElementById('roll_no');
  //   let school: any = document.getElementById('school');
  //   let program: any = document.getElementById('program');
  //   let specialization: any = document.getElementById('specialization');

  //   if(batch){
  //     this.degree.batch = batch.value;
  //   }
  //   if(roll_no){
  //     this.degree.roll_no = roll_no.value;
  //   } if(school){
  //     this.degree.school = school.value;
  //   } if(program){
  //     this.degree.program = program.value;
  //   } if(specialization){
  //     this.degree.specialization = specialization.value;
  //   }
  //   console.log(this.degree);
  //  }

  onSelect(key: string) {
    console.log(key);
    this.school = key;
  }
  onProgram(key: string) {
    console.log(key);
    console.log(key);
    this.program = key;
  }
  onSpecialization(key: string) {
    console.log(key);
  }
  degreeform() {
    console.log("Data before***", this.degreeForm.value)
    // execute the registerUser() given in the spring boot 
    // this.dataService.alumniportalUser(this.url, this.degreeForm.value).subscribe((data: Array<any>) => {
    //   console.log("Data After***", data)
    // },
    //   (error: any) => {
    //     console.log("Error in saving the record", error);
    //   });
      this.dataService.getUsers("http://localhost:9800/allUsers").subscribe((data: Array<any>) => {
        console.log("Data After***", data)
      },
        (error: any) => {
          console.log("Error in saving the record", error);
        });
     
  }
}
