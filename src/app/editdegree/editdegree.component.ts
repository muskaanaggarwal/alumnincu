import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editdegree',
  templateUrl: './editdegree.component.html',
  styleUrls: ['../editlogin/editlogin.component.css']
})
export class EditdegreeComponent implements OnInit {
  degreeForm: FormGroup;
  url: string = "http://localhost:9800/degree/details?id=";

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.degreeForm = this.formBuilder.group({
      school_id: [{value: '', disabled: true}],
      program_id: [{value:'', disabled: true}],
      stream_id: [{value:'', disabled: true}],
      specialization_id: [{value:'', disabled: true}],
      batch_id: [{value:'', disabled: true}],
    });
      if (!this.dataService.user) {
        this.route.navigateByUrl('/alumni');
        return;
      }
      this.dataService.get(this.url + this.dataService.user['roll_no']).subscribe((data: Array<any>) => {
        this.degreeForm.patchValue({
          school_id: data['school_id'],
          program_id: data['program_id'],
          batch_id: data['batch_id'],
          stream_id: data['stream_id'],
          specialization_id: data['specialization_id']
        });
    },
      (error: any) => {
        console.log("Error in fetching details", error);
      });
  }

}
