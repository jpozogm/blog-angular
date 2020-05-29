import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostProxyService } from './post-proxy.service';
import { Post } from './type/post';
import { PostDTO } from './type/postDTO';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private proxy: PostProxyService,
    ) { }

  getPosts(): Observable<Post[]> {
      return this.proxy.getPosts().pipe(
        map(postsDTO => {
          let posts: Post[] = [];
          postsDTO.map(PostsDTO => {
            posts = [...posts, this.DTOToModel(PostsDTO)];
        });
          return posts;
        })
      );
    }

  getPostByID(id: string): Observable<Post> {
    return this.proxy.getPostByID(id).pipe(
      map(postDTO => this.DTOToModel(postDTO))
    );
  }

  saveNewPost(post: Post): Observable<Post>{
    return this.proxy.saveNewPost(this.modelToDTO(post)).pipe(
      map((postResult: PostDTO) => { return {
        // postId: postResult._id,
        _id: postResult._id,
        ...post
        };
      })
    );
  }

  updatePost(postId: string, modifiedPost): Observable<Post> {
      return this.proxy.updatePost(postId, this.modelToDTO(modifiedPost)).pipe(
        map(postDTO => this.DTOToModel(postDTO))
      );
  }

  deletePost(postId: string): Observable<Post> {
      return this.proxy.deletePost(postId).pipe(
        map(postDTO => this.DTOToModel(postDTO))
      );
  }

  private DTOToModel(postDTO: PostDTO): Post {

    return {
      _id: postDTO._id,
      postTittle: postDTO.postTittle,
      postContent: postDTO.postContent,
      postAuthorName: postDTO.postAuthorName,
      postAuthorNickName: postDTO.postAuthorNickName,
      user: postDTO.user,
      postDate: postDTO.postDate,
      postComments: postDTO.postComments
    };
  }

  private modelToDTO(post: Post): PostDTO {
    return {
      _id: post._id,
      postTittle: post.postTittle,
      postContent: post.postContent,
      postAuthorName: post.postAuthorName,
      postAuthorNickName: post.postAuthorNickName,
      user: post.user,
      postDate: post.postDate,
      postComments: post.postComments
    };
  }
}




