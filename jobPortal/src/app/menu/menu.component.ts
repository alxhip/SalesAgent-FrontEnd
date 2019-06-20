import { Component, OnInit } from '@angular/core';
import { AuthenticateUserService } from '../service/auth/authenticate-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authenticateUserService: AuthenticateUserService) { }

  ngOnInit() {
  }

}
