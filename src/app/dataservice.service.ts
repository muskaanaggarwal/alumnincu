import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  public degreeForm: FormGroup;
  public sociallinkForm: FormGroup;
  public personalForm: FormGroup;
  public jobForm: FormGroup;
  public job2Form: FormGroup;
  public addressForm: FormGroup;

  constructor(private http: HttpClient) { }

  alumniportalUser(url, obj) {
    return this.http.post(url, obj);
  }
  degreeformUser(url, obj) {
    return this.http.post(url, obj);
  }
  
}
