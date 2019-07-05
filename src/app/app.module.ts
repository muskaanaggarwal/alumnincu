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
    SociallinkformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'admin', component:AdminComponent},
      {path:'directory', component:DirectoryComponent},
      {path:'alumni', component:AlumniComponent},
      {path:'forgotpage', component:ForgotpageComponent},
      {path:'signup', component:SignupComponent},
      {path:'degreeform', component:DegreeformComponent},
      {path:'personalform', component:PersonalformComponent},
      {path:'addressform', component:AddressformComponent},
      {path:'jobform', component:JobformComponent},
      {path:'sociallinkform', component:SociallinkformComponent},





      // {path:'**',redirectTo:''}
    ])
  ],
  providers: [  DataserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
