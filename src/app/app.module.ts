import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { AlumniComponent } from './alumni/alumni.component';
import { DirectoryComponent } from './directory/directory.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CarouselComponent } from './carousel/carousel.component';
import { ForgotpageComponent } from './forgotpage/forgotpage.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { DataserviceService } from './dataservice.service';
import { DegreeformComponent } from './degreeform/degreeform.component';
import { AddressformComponent } from './addressform/addressform.component';
import { JobformComponent } from './jobform/jobform.component';
import { PersonalformComponent } from './personalform/personalform.component';
import { SociallinkformComponent } from './sociallinkform/sociallinkform.component';
import { Job2formComponent } from './job2form/job2form.component';
import { EditloginComponent } from './editlogin/editlogin.component';
import { EditdegreeComponent } from './editdegree/editdegree.component';
import { EditaddressComponent } from './editaddress/editaddress.component';
import { EditpersonalComponent } from './editpersonal/editpersonal.component';
import { EditjobComponent } from './editjob/editjob.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FileUploadModule} from 'ng2-file-upload';

import { Editjob2Component } from './editjob2/editjob2.component';
// import {MatDatepickerModule} from '@angular/material/datepicker';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    AlumniComponent,
    DirectoryComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent,
    ForgotpageComponent,
    SignupComponent,
    DegreeformComponent,
    AddressformComponent,
    JobformComponent,
    PersonalformComponent,
    SociallinkformComponent,
    Job2formComponent,
    EditloginComponent,
    EditdegreeComponent,
    EditaddressComponent,
    EditpersonalComponent,
    EditjobComponent,
    DashboardComponent,
 
    Editjob2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'directory', component: DirectoryComponent },
      { path: 'alumni', component: AlumniComponent },
      { path: 'forgotpage', component: ForgotpageComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'degreeform', component: DegreeformComponent },
      { path: 'personalform', component: PersonalformComponent },
      { path: 'addressform', component: AddressformComponent },
      { path: 'jobform', component: JobformComponent },
      { path: 'sociallinkform', component: SociallinkformComponent },
      { path: 'job2form', component: Job2formComponent },
      { path: 'editlogin', component: EditloginComponent },
      { path: 'editdegree', component: EditdegreeComponent },
      { path: 'editaddress', component: EditaddressComponent },
      { path: 'editpersonal', component: EditpersonalComponent },
      { path: 'editjob', component: EditjobComponent },
      { path: 'dashboard', component: DashboardComponent },
      
      {path:'editjob2',component:Editjob2Component},
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [DataserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }