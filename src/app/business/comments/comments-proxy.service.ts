import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommentDTO } from './type/commentDTO';
// import { Comment } from './type/comment';



@Injectable({
  providedIn: 'root'
})
export class CommentsProxyService {

  constructor(private httpClient: HttpClient) { }


  getCommentByID(id: string): Observable<CommentDTO> {
    return this.httpClient.get<CommentDTO>(`${environment.apiUrl}${environment.commentsEndpoint}${id}`);
  }

  saveNewComment(id: string, newComment): Observable<CommentDTO>{
    return this.httpClient.post<CommentDTO>(`${environment.apiUrl}${environment.commentsEndpoint}${id}`, newComment);
  }

  updateComment(id: string, comment): Observable<CommentDTO>{
    return this.httpClient.put<CommentDTO>(`${environment.apiUrl}${environment.commentsEndpoint}${id}`, comment);
  }

  deleteComment(id: string): Observable<CommentDTO> {
    return this.httpClient.delete<CommentDTO>(`${environment.apiUrl}${environment.commentsEndpoint}${id}`);
  }
}
