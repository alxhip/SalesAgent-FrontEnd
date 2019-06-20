import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticateUserService } from '../service/auth/authenticate-user.service';
import { Users } from '../shared/users.module';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UiService } from '../service/ui-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('username') username;
  @ViewChild('name') name;
  @ViewChild('password') password;
  @ViewChild('valPassword') valPassword;
  @ViewChild('email') email;
  error = false;
  errorMessage;
  passError = null;

  constructor(private authenticateUser: AuthenticateUserService, private router: Router, private snackBar: MatSnackBar,
              private uiService: UiService) { }

  ngOnInit() {
  }

  signup() {
    const user: Users = new Users(0, this.name.value, this.username.value, this.password.value, this.email.value);
    this.authenticateUser.signup(user).subscribe(
      data => {
        this.router.navigate(['login']);
        this.error = false;
      },
      error => {
        this.uiService.showSnackBar(error.error, null, 4000);
        this.errorMessage = error.error;
      });
  }

  checkPasswordValidation() {
    if (this.password.value !== this.valPassword.value) {
      this.passError = 'Passwords are not matching';
      return;
    }
    this.passError = null;

  }

}
