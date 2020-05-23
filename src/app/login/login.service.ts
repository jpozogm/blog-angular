import { Injectable } from '@angular/core';
import { LoginProxyService } from './login-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private proxt: LoginProxyService) { }
}
