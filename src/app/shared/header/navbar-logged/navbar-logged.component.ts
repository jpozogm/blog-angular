import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { NotificationsBusService } from 'src/app/business/notifications/notifications-bus.service';

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrls: ['./navbar-logged.component.scss']
})
export class NavbarLoggedComponent implements OnInit {

  @Input() scroll;

  token: string;
  tokenInfo: any;
  dropDown = false;

  constructor(
    private notificationsBus: NotificationsBusService,
    private router: Router) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.tokenInfo = jwt_decode(this.token);
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.scroll(100, 0);
    this.notificationsBus.showInfo('LogOut', 'Info Message: ');
    this.router.navigate(['Home']);
  }

  openMenu(){
    this.dropDown = !this.dropDown;
  }
}
