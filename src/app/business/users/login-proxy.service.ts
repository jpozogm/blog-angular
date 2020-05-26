import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenDTO } from './types/tokenDTO';
import { User } from './types/user';
import { UserDTO } from './types/userDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginProxyService {

  constructor(private httpClient: HttpClient) { }

  signIn(login): Observable<TokenDTO> {
    const auth = btoa(`${login.username}:${login.password}`);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + auth }) };
    return this.httpClient.post<TokenDTO>(`${environment.apiUrl}${environment.loginEndPoint}`, '', httpOptions);  }

  signUp(user: User): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(`${environment.apiUrl}${environment.userEndPoint}`, user);
  }

  checkUserByname(name): Observable<UserDTO>{
   return this.httpClient.get<UserDTO>(`${environment.apiUrl}${environment.userEndPoint}${environment.userByName}${name}`);
  }
}
