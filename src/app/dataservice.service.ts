import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  alumniportalUser(url, obj) {
    return this.http.post(url, obj);
  }
  // degreeformUser(url1, obj) {
  //   return this.http.post(url1, obj);
  // }
  
}
