import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../../business/comments/type/comment';

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.css']
})
export class CommentsCardComponent {

  @Input() comment: Comment;
  @Output() clickOnComment = new EventEmitter();

  scrollUp(event){
    this.clickOnComment.emit();
  }
}
