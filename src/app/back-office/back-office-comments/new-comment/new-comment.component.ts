import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CommentService } from 'src/app/business/comments/comments.service';
import { PostsDetailsStoreService } from 'src/app/business/posts/post-details.store';
import { Post } from 'src/app/business/posts/type/post';

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
  comment$: Observable<Post[]>;

  constructor(
    private commentService: CommentService,
    private postDetail: PostsDetailsStoreService) { }

  ngOnInit(): void {

    this.newComment = new FormGroup({
      commentContent: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  async saveNewComment() {
    this.postDetail.saveNewComment$(this.id, this.newComment.value);
    this.newComment.reset();
  }

  ngOnDestroy() {
    if (this.commentSub) {
    this.commentSub.unsubscribe();
    }
  }
}
