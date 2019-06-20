import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Users {
  name: string;
  username: string;
  password: string;
  email: string;
  id: number;
  role;
  constructor(id, name, username, password, email) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = ['user'];
  }
}
