import { Injectable, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  public user: Object;

  constructor(private http: HttpClient) { }

  alumniportalUser(url, obj) {
    return this.http.post(url, obj);
  }
  get(url) {
    return this.http.get(url);
  }
  login(url, payload) {
    return this.http.post(url, payload);
  }
}
