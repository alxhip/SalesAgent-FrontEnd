import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetrieveProfileService } from 'src/app/service/profile/retrieve-profile.service';
import { AuthenticateUserService } from 'src/app/service/auth/authenticate-user.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/service/ui-service.service';
import { USER_ID } from 'src/app/app.constant';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  error = false;
  errorMessage;

  constructor(private profileService: RetrieveProfileService, private router: Router, private uiService: UiService) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      oldPass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      newPassForm: new FormGroup({
        newPass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        valNewPass: new FormControl(null, [Validators.required, Validators.minLength(8)])
      }, this.validatePassword)
    });
  }

  validatePassword(control: FormGroup): { [s: string]: boolean } {

    if (control.value.newPass !== control.value.valNewPass) {
      return { 'Passwords are not matching': true };
    }
    return null;
  }

  onSubmit() {

    this.profileService.updatePassword({
      id: sessionStorage.getItem(USER_ID),
      oldPassword: this.passwordForm.value.oldPass,
      newPassword: this.passwordForm.value.newPassForm.newPass
    }).subscribe(data => {
      this.uiService.showSnackBar('Password updated successfuly. Please login again.', null, 4000);
      this.router.navigate(['login']);
      this.error = false;
    },
      error => {
        this.error = true;
        this.errorMessage = error.error;
      });
  }



}
