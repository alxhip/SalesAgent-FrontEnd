import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateUserService } from '../service/auth/authenticate-user.service';
import { UiService } from '../service/ui-service.service';
// import { MatSnackBar } from '@angular/material';
// import { UiService } from '../service/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // invalidLogin = false;
  username;
  password;
  errorMessage = 'Invalid Credentials';

  constructor(private router: Router, private authenticateService: AuthenticateUserService,
              private uiService: UiService
  ) { }

  ngOnInit() {
  }

  authenticateUser() {

    this.authenticateService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          this.router.navigate(['home']);
          // this.invalidLogin = false
        },
        error => {
          console.log(error);
          this.uiService.showSnackBar('Invalid credentials', null, 4000);
          // this.invalidLogin = true;
        }
      );
  }

  signupUser() {
    this.router.navigate(['/signup']);
  }

}
