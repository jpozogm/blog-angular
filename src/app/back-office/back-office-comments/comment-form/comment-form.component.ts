import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackOfficeProxyService } from '../../back-office-proxy.service';
import { Comments } from '../type/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnDestroy {

  editComment: FormGroup;
  subscription: Subscription;
  saveCommentSub: Subscription;
  comment: Comments;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private backOfficeproxyService: BackOfficeProxyService,
  ) { }

  ngOnInit(): void {

    this.editComment = new FormGroup({
      commentContent: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.backOfficeproxyService.getCommentByID(params.id).subscribe((data) => {
        this.comment = data; this.dataForm(this.comment); });
    });
  }

  dataForm(comment): void{
    this.editComment.patchValue({
      commentContent: comment.commentContent,
    });
  }
  async saveComment(comment) {

    this.saveCommentSub = await this.backOfficeproxyService.updateComment(this.comment._id, comment)
    .subscribe((data) => {
      if (data) {
        window.location.href = `/backOffice/post/${this.comment.commentsPostId}`;
      }
      },
      err => {
        this.error = err.error.message;
      },
      () => {
      console.log('Proceso completado'); }
    );
  }

  resetComment(){
    this.editComment.reset();
  }

  ngOnDestroy() {
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
    if (this.saveCommentSub) {
      this.saveCommentSub.unsubscribe();
      }
  }

}