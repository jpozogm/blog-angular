import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar-logged',
  templateUrl: './navbar-logged.component.html',
  styleUrls: ['./navbar-logged.component.scss']
})
export class NavbarLoggedComponent implements OnInit {

  token: string;
  tokenInfo: any;

  constructor() { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.tokenInfo = jwt_decode(this.token);

  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
