import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Sociallinkmodel } from './slink.model';
import {localaddress} from '../addressform/addressform.component'

@Component({
  selector: 'app-sociallinkform',
  templateUrl: './sociallinkform.component.html',
  styleUrls: ['./sociallinkform.component.css']
})
export class SociallinkformComponent implements OnInit {

  sociallinkForm: FormGroup;
 social = new Sociallinkmodel();
  url = 'http://localhost:9800/sociallinkform';
  constructor(private formBuilder: FormBuilder, private dataService: DataserviceService) { }

  ngOnInit() {
    this.sociallinkForm = this.formBuilder.group({
      facebook: [''],
     linkedin: [''],
      twitter: [''],
      
      });
  }
  localsocial(){
    let facebook: any = document.getElementById('facebook');
    let linkedin: any = document.getElementById('linkedin');
    let twitter: any = document.getElementById('twitter');
    localaddress();

  
  
    if(facebook){
      this.social.facebook = facebook.value;
    }
    if(linkedin){
      this.social.linkedin = linkedin.value;
    } if(twitter){
      this.social.twitter = twitter.value;
    } 
    console.log(this.social);
   }
  sociallinkform() {
    console.log("Data before***", this.sociallinkForm.value)
    // execute the registerUser() given in the spring boot 
    this.dataService.alumniportalUser(this.url, this.sociallinkForm.value).subscribe((data: Array<any>) => {
      console.log("Data After***", data)
    },
      (error: any) => {
        console.log("Error in saving the record", error);
      });
  }

}