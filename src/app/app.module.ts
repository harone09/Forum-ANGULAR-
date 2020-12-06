import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationsComponent } from './Components/publications/publications.component';
//import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './Components/account/account.component';
import { ClassesComponent } from './Components/classes/classes.component';
import { ClassesMenuComponent } from './Components/classes-menu/classes-menu.component';
import { AccountMenuComponent } from './Components/account-menu/account-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './Components/upload/upload/upload.component';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './Components/login/login.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';




@NgModule({
  declarations: [
    AppComponent,
    PublicationsComponent,
    AccountComponent,
    ClassesComponent,
    ClassesMenuComponent,
    AccountMenuComponent,
    LoginComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
