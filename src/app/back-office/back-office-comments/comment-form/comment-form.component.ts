import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/business/comments/comments.service';
import { PostsDetailsStoreService } from 'src/app/business/posts/post-details.store';
import { Comment } from '../../../business/comments/type/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnDestroy {

  editComment: FormGroup;
  subscription: Subscription;
  saveCommentSub: Subscription;
  comment: Comment;
  error: string;
  commentId: string;
  commentDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private postDetailStore: PostsDetailsStoreService,
    private storePostDetail: PostsDetailsStoreService,
  ) { }

  ngOnInit(): void {

    this.editComment = new FormGroup({
      commentContent: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.commentId = this.activatedRoute.snapshot.params.id;
    this.storePostDetail.getCommentById$(this.commentId);
    this.subscription = this.storePostDetail.get$().subscribe(data => {this.commentDetails = data, this.dataForm(this.commentDetails); } );

  }

  dataForm(comment): void{
    this.editComment.patchValue({
      commentContent: comment?.commentContent,
    });
  }

  saveComment(comment) {
    this.postDetailStore.updateComment$(this.commentId, comment);
    window.location.href = `/backOffice/post/${this.commentDetails.commentsPostId}`;
  }

  resetComment(){
    this.editComment.reset();
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
