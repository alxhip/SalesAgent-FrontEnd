import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users/users-routing.module';
import { LoginComponent } from './users/login/login.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), UsersRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
