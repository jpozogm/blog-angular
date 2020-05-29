import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentsProxyService } from './comments-proxy.service';
import { Comment } from './type/comment';
import { CommentDTO } from './type/commentDTO';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private proxy: CommentsProxyService) { }


  getCommentByID(id: string): Observable<Comment> {
    return this.proxy.getCommentByID(id).pipe(
      map(commentDTO => this.DTOToModel(commentDTO))
    );
  }

  updateComment(id: string, comment: Comment): Observable<Comment> {
    return this.proxy.updateComment(id, this.modelToDTO(comment)).pipe(
      map(commentDTO => this.DTOToModel(commentDTO))
    );
  }

  saveNewComment(id: string, newComment: Comment): Observable<Comment> {
    return this.proxy.saveNewComment(id, this.modelToDTO(newComment)).pipe(
      map((commentResult: CommentDTO) => { return {
        comment: commentResult._id,
        ...newComment
        };
      })
    );
  }

  deleteComment(id: string): Observable<Comment>  {
    return this.proxy.deleteComment(id).pipe(
      map(postDTO => this.DTOToModel(postDTO))
    );
  }


  private DTOToModel(commentDTO: CommentDTO): Comment {

    return {
      commentAuthorNickName: commentDTO.commentAuthorNickName,
      commentContent: commentDTO.commentContent,
      _id: commentDTO._id,
      commentsPostId: commentDTO.commentsPostId,
      userId: commentDTO.userId
    };
  }

  private modelToDTO(comment: Comment): CommentDTO {
    return {
      commentAuthorNickName: comment.commentAuthorNickName,
      commentContent: comment.commentContent,
      _id: comment._id,
      commentsPostId: comment.commentsPostId,
      userId : comment.userId
    };
  }

}




