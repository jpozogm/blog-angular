import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Observable, Subscription } from 'rxjs';
import { CommentService } from 'src/app/business/comments/comments.service';
import { PostsDetailsStoreService } from 'src/app/business/posts/post-details.store';
import { PostsStoreService } from 'src/app/business/posts/post.store';
import { Post } from 'src/app/business/posts/type/post';
import { Comment } from '../../../business/comments/type/comment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit{

  deleteCommentSub: Subscription;
  post$: Observable<Post>;
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
    private storePostDetail: PostsDetailsStoreService,
    private storePost: PostsStoreService,
  ) { }

  ngOnInit(): void {

    this.editPostBtn = false;
    this.editCommentBtn = false;


    this.postID =  this.activatedRoute.snapshot.paramMap.get('id');
    this.storePostDetail.init(this.postID);
    this.post$ = this.storePostDetail.get$();

    this.token = localStorage.getItem('token');
    this.tokenInfo = jwt_decode(this.token);
  }


  editPost(){
    this.editPostBtn = !this.editPostBtn;
  }

  deletePost(){
    this.storePost.deletePost$(this.postID);
    window.location.href = `/backOffice`;
  }

  deleteComment(id){
    this.storePostDetail.deleteComment$(id);
  }

  backBackOffice(){
    this.router.navigate(['backOffice']);
  }

  updateComment$(id: string, comment: Comment){
    this.storePostDetail.updateComment$(id, comment);
  }



}
