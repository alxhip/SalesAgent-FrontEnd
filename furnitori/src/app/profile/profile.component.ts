import { Component, OnInit } from '@angular/core';
import { RetrieveProfileService } from '../service/profile/retrieve-profile.service';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Users } from '../shared/users.module';
import { Router } from '@angular/router';
import { UiService } from '../service/ui-service.service';
import { AuthenticateUserService } from '../service/auth/authenticate-user.service';
import { USER_ID } from '../app.constant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username;
  name;
  email;

  // profileForm: FormGroup;
  currentPass;
  // validPass;
  // currentPassError;

  constructor(private route: Router, private profileService: RetrieveProfileService,
              private authenticateUserService: AuthenticateUserService, private uiService: UiService) { }

  ngOnInit() {
    // this.profileForm = new FormGroup({
    //   'username': new FormControl(null, Validators.required),
    //   'name': new FormControl(null, [Validators.required]),
    //   'email': new FormControl(null, [Validators.required, Validators.email]),
    // })
    const userId = sessionStorage.getItem(USER_ID);
    this.profileService.getProfile(userId).subscribe(
      data => {
        // this.profileForm.patchValue({
        //   'username': data.username,
        //   'name': data.name,
        //   'email': data.email
        // })
        this.username = data.username;
        this.name = data.name;
        this.email = data.email;
        this.currentPass = data.password;
      });
  }

  onSubmit() {
    // let checkOldPass;
    // checkOldPass = false;
    // this.profileService.checkPassword(
    //   new Users(
    //     sessionStorage.getItem(USER_ID),
    //     null,
    //     null,
    //     this.profileForm.value.oldPass,
    //     null)).subscribe(data => {
    //       // checkOldPass = data
    //       // console.log(checkOldPass)
    //     })
    // console.log('out:' + checkOldPass)
    // if (checkOldPass) {
    //   console.log('in')
    this.profileService.updateProfile(
      new Users(sessionStorage.getItem(USER_ID)
        , this.name
        , this.username
        , this.currentPass
        , this.email
      )).subscribe(data => {
        this.authenticateUserService.logout();
        this.route.navigate(['login']);
        this.uiService.showSnackBar('Your profile is updated. Please log in again.', null, 4000);
      }
      );
    // }
    // else {
    //   this.currentPassError = "Password is not valid"
    //   console.log(this.currentPassError)
    //   console.log(this.profileForm)
    // }

  }



  // checkOldPass(control: FormControl): { [s: string]: boolean } {

  //   this.profileService.checkPassword(new Users(sessionStorage.getItem(USER_ID), null, null, control.value, null))
  //   if (control.value !== null && this.currentPass !== control.value.oldPass) {
  //     return { "IncorrectPassword": true }
  //   }
  //   return null;
  // }
  onChangePassword() {
    this.route.navigate(['profile/password']);
  }

}
