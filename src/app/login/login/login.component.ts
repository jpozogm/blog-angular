import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsBusService } from 'src/app/business/notifications/notifications-bus.service';
import { LoginService } from 'src/app/business/users/login.service';
import { CommonValidator } from 'src/app/common-validator';
import { LoginProxyService } from '../../business/users/login-proxy.service';
import { Token } from '../../business/users/types/token';
import { User } from '../../business/users/types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private loginproxyService: LoginProxyService,
    private notificationsBus: NotificationsBusService) {
      this.eye = '../../../assets/svg/sprite.svg#eye-open';
      this.eyeSlash = './assets/svg/sprite.svg#eye-hide';
      this.show = this.eye;
    }

  user: User;
  signInLogin: FormGroup;
  signUpLogin: FormGroup;
  signInSub: Subscription;
  signUpSub: Subscription;
  login: Token;
  token: any;
  role: string;
  error: string;

  show: string;
  eye: string;
  eyeSlash: string;
  hidden = 'ocultar';
  passwordType = 'password';
  errors: any;

  customErrorsMessages = {};


  usertesting: string;

  newUser: User;
  newUserLogged: Subscription;

  ngOnInit(): void {
    this.signInLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.signUpLogin = new FormGroup({
      user: new FormControl('',
        [Validators.required, CommonValidator.startWithNumber],
        [CommonValidator.userTaken(this.loginService)]),

      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      repeatPassword: new FormControl('', [Validators.required, CommonValidator.compareValidator('password')]),
      role: new FormControl('', [Validators.required])
    });

    this.customErrorsMessages = {
      required: 'This field must not be empty',
      minLength: 'Sorry, this field is too short',
      userTaken: 'User is already taken',
      startWithNumber: 'Username can´t start with number',
      maxlength: 'Sorry, this field is too long',
      compareValidator: 'Repeat Password must be equal to Password'
    };
  }

  showError(msg, sum){
    this.notificationsBus.showError(msg, sum);
  }

  signIn(form){

    this.signInSub = this.loginService.signIn(form).subscribe((data) => {
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
    this.signUpSub = this.loginService.signUp(this.signUpLogin.value).subscribe((data) => {
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

  seePassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.show = this.eyeSlash;

    } else {
      this.passwordType = 'password';
      this.show = this.eye;
    }
  }

  ngOnDestroy() {
    if (this.signInSub) {
    this.signInSub.unsubscribe();
    }
    if (this.signUpSub) {
      this.signUpSub.unsubscribe();
      }
  }

}
