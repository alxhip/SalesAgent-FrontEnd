import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './profile/password/password.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { SignupComponent } from './signup/signup.component';
import { ClientComponent } from './client/client.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RouteGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardService], data: {} },
  { path: 'home/:supplierId', component: HomeComponent, canActivate: [RouteGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [RouteGuardService], data: {} },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: 'profile/password', component: PasswordComponent, canActivate: [RouteGuardService] },
  { path: 'clients', component: ClientComponent, canActivate: [RouteGuardService], data: { allowedRoles: ['Admin', 'Agent'] } },
  { path: 'orders', component: OrdersComponent, canActivate: [RouteGuardService], data: {} },
  { path: 'newOrder', component: OrderDetailsComponent, canActivate: [RouteGuardService], data: { allowedRoles: ['Client'] } },
  { path: 'signup', component: SignupComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
