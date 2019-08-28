import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Personalmodel } from './personal.model';
import { Router } from '@angular/router';
import {FileUploadModule, FileUploader, FileItem} from 'ng2-file-upload';


@Component({
  selector: 'app-personalform',
  templateUrl: './personalform.component.html',
  styleUrls: ['../addressform/addressform.component.css']
})
export class PersonalformComponent implements OnInit {

  personalForm: FormGroup;
  personal = new Personalmodel();
  url = 'http://localhost:9800/personal_detailsform';
  errorMessage: string;
  saved: boolean;
  successMessage: string;
  currentFileUpload: File;
  selectedFiles: any;
  uploader: any;
  fileInput: any;
  isDropOver: any;
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService, private route: Router) { }

  ngOnInit() {
    this.personalForm = this.formBuilder.group({
      photo: [''],
      spouse_name: [''],
      anniversary_date: [''],
    });
    if (!this.dataService.user) {
      this.route.navigateByUrl('/alumni');
      return;
    }
    
    if (this.dataService.personalForm) {
      this.personalForm = this.dataService.personalForm;
    }
    const headers = [{name: 'Accept', value: 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:9800/api/files'}];
    this.uploader = new FileUploader({url: 'http://localhost:9800/api/files', autoUpload: true, headers: headers});
    this.uploader.options.additionalParameter = {
      roll_no: this.dataService.user['roll_no']
    };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteAll = () => alert('File uploaded');
  }
  ngOnDestroy() {
    this.dataService.personalForm = this.personalForm;
  }
  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }
 
  fileClicked() {
    try {
      this.fileInput.nativeElement.click();
    } catch (error) {
      // console.log(error); 
    }
  }
  checkSaved() {
    if (!this.saved) {
      this.errorMessage = "Please click save before you proceed!"
    }
    else {
      this.route.navigateByUrl('/sociallinkform');
    }
  }
  selectFile(event) {
    const file = event.target.files.item(0);
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }
  postPersonalDetails() {
    if (!this.saved) {
      this.errorMessage = "";
      if (this.personalForm.valid) {
        this.personalForm.value['roll_no'] = this.dataService.user['roll_no'];
        this.personalForm.value['batch_id'] = this.dataService.degreeForm.value['batch_id'];
        this.personalForm.value['specialization_id'] = this.dataService.degreeForm.value['specialization_id'];
        console.log(this.personalForm.value);
        this.dataService.alumniportalUser(this.url, this.personalForm.value).subscribe((data: Array<any>) => {
          this.saved = true;
          this.successMessage = "Saved successfully! Click next to proceed";
        },
          (error: any) => {
            this.errorMessage = error.message;
          });
      }
      else {
        this.saved = false;
        this.errorMessage = "Please fill all the details";
      }
    }
  }
}