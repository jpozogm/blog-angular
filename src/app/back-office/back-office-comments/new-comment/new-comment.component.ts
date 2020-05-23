import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BackOfficeProxyService } from '../../back-office-proxy.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit, OnDestroy {

  @Input() id: string;
  newComment: FormGroup;
  commentSub: Subscription;
  error: string;

  constructor(private backOfficeProxyService: BackOfficeProxyService, ) { }

  ngOnInit(): void {

    this.newComment = new FormGroup({
      commentContent: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  async saveNewComment() {
    this.commentSub = await this.backOfficeProxyService.saveNewComment(this.id, this.newComment.value)
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

  ngOnDestroy() {
    if (this.commentSub) {
    this.commentSub.unsubscribe();
    }
  }
}




