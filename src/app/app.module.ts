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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 
import { ArticleComponent } from './article/article.component';
import { ArticleService } from './article/article.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    AlumniComponent,
    DirectoryComponent,
    FooterComponent,
    HomeComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'admin', component:AdminComponent},
      {path:'directory', component:DirectoryComponent},
      {path:'alumni', component:AlumniComponent},

      // {path:'**',redirectTo:''}
    ])
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
