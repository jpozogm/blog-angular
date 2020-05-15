import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginProxyService {

  constructor(private httpClient: HttpClient) { }

  signIn(login): Observable<any> {
    const auth = btoa(`${login.username}:${login.password}`);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Basic ' + auth }) };
    return this.httpClient.post('http://localhost:3000/login/', '', httpOptions); // 2 arg es los datos nuevos
  }

signUp(){ }
}
