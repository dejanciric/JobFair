import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { CompanyComponent } from './company/company.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';
import { GuestComponent } from './guest/guest.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordChangeComponent,
    AdminComponent,
    StudentComponent,
    CompanyComponent,
    RegistrationComponent,
    GuestComponent,
    CompanyRegistrationComponent,
    AdminRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
