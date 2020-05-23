import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BackOfficeProxyService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}${environment.postEndpoint}`);
  }

  getPostByID(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}${environment.postEndpoint}${id}`);
  }

   saveNewPost(newPost: string){
     return this.httpClient.post(`${environment.apiUrl}${environment.postEndpoint}`, newPost);
  }

  updatePost(id: string, post){
    return this.httpClient.put(`${environment.apiUrl}${environment.postEndpoint}${id}`, post);
  }

  deletePost(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${environment.postEndpoint}${id}`);
  }

  getCommentByID(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}${environment.commentsEndpoint}${id}`);
  }

  saveNewComment(id: string, newComment: string){
    return this.httpClient.post(`${environment.apiUrl}${environment.commentsEndpoint}${id}`, newComment);
  }

  updateComment(id: string, comment: string){
    return this.httpClient.put(`${environment.apiUrl}${environment.commentsEndpoint}${id}`, comment);
  }

  deleteComment(id: string): Observable<any>  {
    return this.httpClient.delete(`${environment.apiUrl}${environment.commentsEndpoint}${id}`);
  }

}
