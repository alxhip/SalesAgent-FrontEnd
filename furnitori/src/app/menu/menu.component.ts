import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthenticateUserService } from '../service/auth/authenticate-user.service';
import { USER_ROLE } from '../app.constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private userRole;

  constructor(private authenticateUserService: AuthenticateUserService) {

  }

  ngOnInit() {
    this.userRole = this.getUserRole();
    console.log(this.userRole);


  }
  getUserRole() {
    return sessionStorage.getItem(USER_ROLE);
  }

}
