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
import { RegistrationComponent } from './registration/registration.component';
import { SignupComponent } from './signup/signup.component';


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
    RegistrationComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'admin', component:AdminComponent},
      {path:'directory', component:DirectoryComponent},
      {path:'alumni', component:AlumniComponent},
      {path:'forgotpage', component:ForgotpageComponent},
      {path:'registration', component:RegistrationComponent},
      {path:'signup', component:SignupComponent},




      // {path:'**',redirectTo:''}
    ])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
