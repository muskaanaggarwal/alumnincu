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
  degree = new Degreemodel();
  Batches: Object[];
  Schools: Object[];
  Programs: Object[];
  Streams: Object[];
  Specializations: Object[];
  current_batch: String;
  current_school: number;
  current_program: number;
  current_stream: number;
  current_specialization: number;
  filteredBatches: Object[];
  filteredPrograms: Object[];
  filteredStreams: Object[];
  filteredSpecialization: Object[];
  degreeForm: FormGroup;
  batch_url = 'http://localhost:9800/batch/all';
  school_url = 'http://localhost:9800/school/all';
  program_url = 'http://localhost:9800/program/all';
  stream_url = 'http://localhost:9800/stream/all';
  specialization_url = 'http://localhost:9800/specialization/all';
  url = 'http://localhost:9800/degreeform';

  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) {

  }
  ngOnInit() {
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
    }
    this.degreeForm = this.formBuilder.group({
      school_id: [''],
      program_id: [''],
      stream_id: [''],
      specialization_id: [''],
      batch_id: [''],
    });
    if (this.dataService.degreeForm) {
      // this.degreeForm = this.dataService.degreeForm;
    }
    this.dataService.get(this.batch_url).subscribe((data: Array<any>) => {
      this.Batches = data;
      this.current_batch = data[0]['batch_id'];
    },
      (error: any) => {
        console.log("Error in fetching details", error);
      });
    this.dataService.get(this.school_url).subscribe((data: Array<any>) => {
      this.Schools = data;
      this.current_school = data[0]['school_id'];
    },
      (error: any) => {
        console.log("Error in fetching details", error);
      });
    this.dataService.get(this.program_url).subscribe((data: Array<any>) => {
      this.Programs = data;
      this.current_program = data[0]['program_id'];
    },
      (error: any) => {
        console.log("Error in fetching details", error);
      });
    this.dataService.get(this.stream_url).subscribe((data: Array<any>) => {
      this.Streams = data;
      this.current_stream = data[0]['stream_id'];
    },
      (error: any) => {
        console.log("Error in fetching details", error);
      });
    this.dataService.get(this.specialization_url).subscribe((data: Array<any>) => {
      this.Specializations = data;
      this.current_specialization = data[0]['specialization_id'];
    },
      (error: any) => {
        console.log("Error in fetching details", error);
      });
  }
  ngOnDestroy() {
    this.dataService.degreeForm = this.degreeForm;
  }

  degreeform() {


  }
  onBatchChange(key: string) {
    this.current_batch = key;
  }
  onSchoolChange(key: number) {
    this.current_school = key;
    this.filteredPrograms = this.Programs.filter(tempProgram => {
      if(tempProgram['school_id'] == this.current_school){
        return tempProgram;
      }
    });
    this.filteredStreams = null;
    this.filteredSpecialization = null;
    this.filteredBatches = null;
  }
  onProgramChange(key: number) {
    this.current_program = key;
    this.filteredStreams = this.Streams.filter(tempStream => {
      if(tempStream['program_id'] == this.current_program){
        return tempStream;
      }
    });
    this.filteredSpecialization = null;
    this.filteredBatches = null;
  }
  onStreamChange(key: number) {
    this.current_stream = key;
    this.filteredSpecialization = this.Specializations.filter(tempSpecialization => {
      if(tempSpecialization['stream_id'] == this.current_stream){
        return tempSpecialization;
      }
    });
    this.filteredBatches = this.Streams.filter(tempStream => {
      if(tempStream['stream_id'] == this.current_stream){
          return tempStream;
      }
    });
  }
  onSpecializationChange(key: number) {
    this.current_specialization = key;
  }
}
