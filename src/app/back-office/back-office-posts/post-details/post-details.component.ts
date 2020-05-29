import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/business/comments/comments.service';
import { PostsStoreService } from 'src/app/business/posts/post.store';
import { Post } from 'src/app/business/posts/type/post';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  deleteCommentSub: Subscription;
  post$: Post;
  editPostBtn: boolean;
  editCommentBtn: boolean;
  id: string;
  commentByIndex: any;
  commentId: string;
  error: string;
  token: string;
  tokenInfo: any;
  postID: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private store: PostsStoreService,
  ) { }

  ngOnInit(): void {

    this.editPostBtn = false;
    this.editCommentBtn = false;
    this.store.init();

    this.postID =  this.activatedRoute.snapshot.paramMap.get('id');
    this.getPostById(this.postID);

    this.token = localStorage.getItem('token');
    this.tokenInfo = jwt_decode(this.token);
  }

  async getPostById(postId) {
    this.post$ = await this.store.getPostById$(postId);
  }


  editPost(){
    this.editPostBtn = !this.editPostBtn;
  }

  deletePost(){
    this.store.delete$(this.postID);
    this.store.get$();
    window.location.href = `/backOffice`;

  }

  deleteComment(i){
   // this.commentByIndex = this.post.postComments[i];
    this.commentId = this.commentByIndex._id;

    this.deleteCommentSub = this.commentService.deleteComment(this.commentId)
    .subscribe((data) => {
      if (data) {
        window.location.href = `/backOffice/post/${this.id}`;
      }
      },
      err => {
        this.error = err.error.message;
      },
      () => {
      console.log('Proceso completado'); }
    );
  }

  backBackOffice(){
    this.router.navigate(['backOffice']);
  }

  ngOnDestroy() {
    if (this.deleteCommentSub) {
      this.deleteCommentSub.unsubscribe();
    }
  }
}
