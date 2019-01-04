import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { GuestComponent } from './guest/guest.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { OffersComponent } from './offers/offers.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'passwordChange', component: PasswordChangeComponent},
  {path: 'student', component: StudentComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'guest', component: GuestComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'companyRegistration', component: CompanyRegistrationComponent},
  {path: 'adminRegistration', component: AdminRegistrationComponent},
  {path: 'companyDetails', component: CompanyDetailsComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'offerDetails', component: OfferDetailComponent},
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
