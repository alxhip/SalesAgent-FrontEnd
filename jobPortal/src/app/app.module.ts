import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpInterceptorService } from './service/auth/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { UserJobsComponent } from './user-jobs/user-jobs.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordComponent } from './profile/password/password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobFormComponent } from './job-form/job-form.component';
import { JobDetailsComponent } from './job-details/job-details.component';

// import from { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    HomeComponent,
    ProfileComponent,
    UserJobsComponent,
    SignupComponent,
    PasswordComponent,
    JobFormComponent,
    JobDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
