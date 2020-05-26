import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/business/comments/comments.service';
import { Post } from 'src/app/business/posts/type/post';
import { PostProxyService } from '../../../business/posts/post-proxy.service';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  deletePostSub: Subscription;
  deleteCommentSub: Subscription;
  post: Post;
  editPostBtn: boolean;
  editCommentBtn: boolean;
  id: string;
  commentByIndex: any;
  commentId: string;
  error: string;
  token: string;
  tokenInfo: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private PostProxyService: PostProxyService,
  ) { }

  ngOnInit(): void {

    this.editPostBtn = false;
    this.editCommentBtn = false;

    this.subscription = this.activatedRoute.params.subscribe((params) => { this.id = params.id,
      this.PostProxyService.getPostByID(this.id).subscribe((data) => {
        this.post = data; console.log(this.post); });
    });

    this.token = localStorage.getItem('token');
    this.tokenInfo = jwt_decode(this.token);
  }

  editPost(){
    this.editPostBtn = !this.editPostBtn;
  }

  async deletePost(){

    this.deletePostSub =  await this.PostProxyService.deletePost(this.id)
    .subscribe((data) => {
      if (data) {
        this.router.navigate(['backOffice']);
        }
    },
      err => {
        this.error = err.error.message;
      },
      () => {
        console.log('Proceso completado');
      }
    );
  }

  async deleteComment(i){
    this.commentByIndex = this.post.postComments[i];
    this.commentId = this.commentByIndex._id;

    this.deleteCommentSub =  await this.commentService.deleteComment(this.commentId)
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
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
    if (this.deletePostSub) {
      this.deletePostSub.unsubscribe();
    }
    if (this.deleteCommentSub) {
      this.deleteCommentSub.unsubscribe();
    }
  }
}



