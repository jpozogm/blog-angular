import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../types/post';
import { BackOfficeProxyService } from './back-office-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService implements OnDestroy{

  newPost: FormGroup;
  privatePosts$: Observable<Post>;
  saveNewPostSub: Subscription;
  updatePostSub: Subscription;
  deleteCommentSub: Subscription;
  postCreated: Subscription;
  post: Post;
  localStorageUser: string;
  error: string;
  saved: boolean;

  constructor(
    private router: Router,
    private proxy: BackOfficeProxyService,
    private activatedRoute: ActivatedRoute,
    ) { }

  /*  getPosts(): Observable<Post[]> {
      return this.proxy.getPosts().pipe(
        map((postsDTO: PostDTO[]) => {
          let posts: Post[] = [];
          postsDTO.forEach((postDTO: PostDTO) => {
            const post: Post = {
              _id: postDTO._id,
              postTittle: postDTO.postTittle,
              postContent: postDTO.postContent,
              postAuthorName: postDTO.postAuthorName,
              postAuthorNickName: postDTO.postAuthorNickName,
              user: postDTO.user,
              postDate: postDTO.postDate,
              postComments: postDTO.postComments
            };
            posts = [...posts, post];
          });
          return posts;
        })
      );
    }
 */




   saveNewPost(newPost){
    }

   updatePost(postId, post) {

    }

   deletePost(id){

  }

   deleteComment(commentId, postId){

  }


  ngOnDestroy() {
    if (this.saveNewPostSub) {
      this.saveNewPostSub.unsubscribe();
    }


    if (this.updatePostSub) {
      this.updatePostSub.unsubscribe();
    }
  }



}
