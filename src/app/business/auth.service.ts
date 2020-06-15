import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NotificationsBusService } from './notifications/notifications-bus.service';

@Injectable({
  providedIn: 'root'
})
  export class AuthService implements CanActivate{
  constructor(
    private router: Router,
    private notificationsBus: NotificationsBusService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    this.notificationsBus.showWarn('Your should be logged first', 'Warn Message: ');
    this.router.navigateByUrl('/login', {queryParams: {returnUrl: state.url}}); return false;
  } }
  }
