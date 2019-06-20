import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateUserService } from '../service/auth/authenticate-user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private route: Router, private authenticateUserService: AuthenticateUserService) { }

  ngOnInit() {
    this.authenticateUserService.logout();
    this.route.navigate(['login']);
  }

}
