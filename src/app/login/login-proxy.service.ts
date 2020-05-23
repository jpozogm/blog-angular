import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginProxyService {

  constructor(private httpClient: HttpClient) { }

  signIn(login): Observable<any> {
    const auth = btoa(`${login.username}:${login.password}`);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + auth }) };
    return this.httpClient.post(`${environment.apiUrl}${environment.loginEndPoint}`, '', httpOptions); // 2 arg es los datos nuevos
  }

  signUp(user): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}${environment.userEndPoint}`, user);
  }

  checkUserByname(name): Observable<any>{
   return this.httpClient.get(`${environment.apiUrl}${environment.userEndPoint}${environment.userByName}${name}`);
  }
}
