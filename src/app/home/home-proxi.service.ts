import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeProxiService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/posts/');
  }

  getPostByID(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/posts/${id}`);
  }

}
