import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonValidator } from 'src/app/common-validator';
import { LoginProxyService } from '../login-proxy.service';
import { Token } from '../types/token';
import { User } from '../types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor( private router: Router,
               private loginproxyService: LoginProxyService) { }

  user: User;
  signInLogin: FormGroup;
  signUpLogin: FormGroup;
  subscription: Subscription;
  login: Token;
  token: any;
  role: string;
  error: string;
  name: string;

  usertesting: string;

  newUser: Subscription;
  newUserLogged: Subscription;

  ngOnInit(): void {
    this.signInLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.signUpLogin = new FormGroup({
      user: new FormControl('',
        [Validators.required, CommonValidator.startWithNumber],
        [CommonValidator.userTaken(this.loginproxyService)]),

      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      repeatPassword: new FormControl('', [Validators.required, CommonValidator.compareValidator('password')]),
      role: new FormControl('', [Validators.required])
    });

    this.name = 'Sagan';
  }


  signIn(form){

    this.subscription = this.loginproxyService.signIn(form).subscribe((data) => {
      this.token = data; console.log('data', data);

      if (data) {
      localStorage.setItem('token', this.token.token);
      localStorage.setItem('user', this.signInLogin.controls.username.value);

      this.router.navigate(['backOffice']);
    } else {
      return 'usuario incorrecto';
    }
    });
  }

  signUp() {
    this.loginproxyService.signUp(this.signUpLogin.value).subscribe((data) => {
      if (data) {

        this.newUser = data;

        const form = {
          username : this.signUpLogin.controls.user.value,
          password: this.signUpLogin.controls.password.value,
        };
        this.signIn(form);
      }
      },
        err => {
          this.error = err.error.message;
        },
      () => {
        console.log('Proceso completado');
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
  }

}
