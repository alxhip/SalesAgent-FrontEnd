import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RouteGuardService } from './service/route-guard.service';
import { UserJobsComponent } from './user-jobs/user-jobs.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordComponent } from './profile/password/password.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobDetailsComponent } from './job-details/job-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [RouteGuardService] },
  { path: 'userJobs', component: UserJobsComponent, canActivate: [RouteGuardService] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'jobDetails/:jobId', component: JobDetailsComponent, canActivate: [RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: 'job/:jobId', component: JobFormComponent, canActivate: [RouteGuardService] },
  { path: 'profile/password', component: PasswordComponent, canActivate: [RouteGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
