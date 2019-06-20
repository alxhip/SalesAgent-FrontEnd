import { Component, OnInit } from '@angular/core';
import { usersObj } from 'src/assets/mocks/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  }

  onLogin(username, password) {
    usersObj.forEach((data, index) => {
      if (data.username === username && password === data.password) {
        console.log(data.username + '**' + username);
        console.log('yes');
      } else {
        console.log(data.username + '**' + username);
        console.log('no');
      }
    });
  }

}
