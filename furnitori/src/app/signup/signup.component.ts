import { Component, OnInit, ViewChild } from '@angular/core';
import { Users } from '../shared/users.module';
import { AuthenticateUserService } from '../service/auth/authenticate-user.service';
import { UiService } from '../service/ui-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  private password;
  private passwordConfirm;
  private supervisorId;
  private address;
  private userLat;
  private userLng;
  public lat = 41.327891;
  public lng = 19.817734;
  private passError;
  private errorMessage;
  private signUpForm: FormGroup;

  constructor(private authenticateUser: AuthenticateUserService, private uiService: UiService, private router: Router) {

  }



  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      nipt: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwordForm: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        passwordConfirm: new FormControl(null, [Validators.required])
      }, this.checkPasswordValidation.bind(this))

    });
  }

  signup() {
    const user = {
      username: this.signUpForm.value.username, name: this.signUpForm.value.name, nipt: this.signUpForm.value.nipt,
      email: this.signUpForm.value.email, password: this.signUpForm.value.passwordForm.password, latitude: this.userLat,
      longitude: this.userLng
    };

    if (this.userLat === undefined && this.userLng === undefined) {
      this.uiService.showSnackBar('Please mark your address', null, 4000);
    } else {
      this.authenticateUser.signup(user).subscribe(
        data => {
          this.router.navigate(['home']);
          this.uiService.showSnackBar('User created successfuly', null, 4000);
        },
        error => {
          this.uiService.showSnackBar(error.error, null, 4000);
          this.errorMessage = error.error;
        });

    }

  }

  checkPasswordValidation(control: FormGroup): { [s: string]: boolean } {
    if (control.value.password !== control.value.passwordConfirm) {
      const errorValidation = this.checkPasswordValidation;
      this.signUpForm.controls.passwordForm.get('passwordConfirm').setErrors(errorValidation);
      return { passwordsDoNotMatch: true };
    }
    return null;
  }



  getLocation(event) {
    this.userLat = event.coords.lat;
    this.userLng = event.coords.lng;
  }

}
