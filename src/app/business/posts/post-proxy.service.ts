import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from './type/post';
import { PostDTO } from './type/postDTO';


@Injectable({
  providedIn: 'root'
})
export class PostProxyService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<PostDTO[]> {
    return this.httpClient.get<PostDTO[]>(`${environment.apiUrl}${environment.postEndpoint}`);
  }

  getPostByID(id: string): Observable<PostDTO> {
    return this.httpClient.get<PostDTO>(`${environment.apiUrl}${environment.postEndpoint}${id}`);
  }

   saveNewPost(newPost: Post): Observable<PostDTO>{
     return this.httpClient.post<PostDTO>(`${environment.apiUrl}${environment.postEndpoint}`, newPost);
  }

  updatePost(id: string, post): Observable<PostDTO>{
    return this.httpClient.put<PostDTO>(`${environment.apiUrl}${environment.postEndpoint}${id}`, post);
  }

  deletePost(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${environment.postEndpoint}${id}`);
  }
}
