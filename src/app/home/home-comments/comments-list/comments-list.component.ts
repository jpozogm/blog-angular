import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommentsStoreService } from 'src/app/business/comments/comments.store';
import { Comment } from '../../../business/comments/type/comment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  publicComments$: Observable<Comment[]>;
  subscription: Subscription;
  commentId: string[];

  constructor(
    private store: CommentsStoreService) { }

  ngOnInit(): void {
    this.store.init();
    this.publicComments$ = this.store.get$();
  }

  scrollUp(event){
    window.scroll(100, 0);
  }
}



