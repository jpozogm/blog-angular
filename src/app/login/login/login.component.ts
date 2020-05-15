import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Token } from '../auth/types/token';
import { LoginProxyService } from '../login-proxy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginProxiService: LoginProxyService) { }


  signInLogin: FormGroup;
  signUpLogin: FormGroup;
  subscription: Subscription;
  login: Token;
  token: any;

  ngOnInit(): void {
    this.signInLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.signUpLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }


  signIn(){
    this.login = this.signInLogin.value;

    this.loginProxiService.signIn(this.login).subscribe(data => {
      this.token = data.token;
    });
    localStorage.setItem('token', this.token);
  }

signUp() {
    const username = this.signUpLogin.get('username').value;
    const password = this.signUpLogin.get('password').value;
    const role = this.signUpLogin.get('role').value;

    console.log(username);
    console.log(password);
    console.log(role);
  }

}
