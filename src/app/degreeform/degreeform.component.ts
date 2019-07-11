import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-degreeform',
  templateUrl: './degreeform.component.html',
  styleUrls: ['./degreeform.component.css']
})
export class DegreeformComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  school: string = 'SOET'
  schools: object = {
    "SOET": {
      "B.Tech - Computer Science & Engineering (CSE)": "B.Tech - Computer Science & Engineering (CSE)",
      2: 2,
      3: 3
    },
    "School Of Applied Sciences": {
      4: 4,
      5: 5,
      6: 6
    },
    "SOM": {
      7: 7,
      8: 8,
      9: 9
    }
  }
  onSelect(key: string) {
    console.log(key);
    this.school = key;
  }
  onProgram(key: string) {
    console.log(key);
  }
}
