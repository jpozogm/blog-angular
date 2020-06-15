import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommentService } from 'src/app/business/comments/comments.service';
import { NotificationsBusService } from 'src/app/business/notifications/notifications-bus.service';
import { PostsDetailsStoreService } from 'src/app/business/posts/post-details.store';
import { Post } from 'src/app/business/posts/type/post';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  @Input() id: string;
  newComment: FormGroup;
  error: any;
  comment$: Observable<Post[]>;
  commentErrorsMessages = {};

  constructor(
    private commentService: CommentService,
    private postDetail: PostsDetailsStoreService,
    private notificationsBus: NotificationsBusService) { }

  ngOnInit(): void {

    this.newComment = new FormGroup({
      commentContent: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    this.commentErrorsMessages = {
      required: 'This field must not be empty.',
      minLength: 'Sorry, this field is too short.',
      error: `${this.error}`
    };
  }

  saveNewComment() {
    this.postDetail.saveNewComment$(this.id, this.newComment.value)
      .then((data) => {
        this.notificationsBus.showSuccess('Your dates has been saved correctly! ♡', 'Welcome: ');
        this.newComment.reset();
      })
      .catch(
        err => {
          this.error = err.error.message;
          this.notificationsBus.showError('Something was wrong, try it later ✎', 'Error: ');
        });
  }
}
