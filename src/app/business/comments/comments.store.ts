import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Comment } from '../comments/type/comment';
import { PostsStoreService } from '../posts/post.store';
import { Store } from '../store';
import { CommentService } from './comments.service';

@Injectable({providedIn: 'root'})

export class CommentsStoreService extends Store<Comment[]>{

    constructor(
        private service: CommentService,
        private postsStoreService: PostsStoreService, ) {
        super();
    }

    init(): Promise<Comment[]> {
        if (this.get()) { return; }
        return this.service.getComments().pipe(
            tap(comments => {this.store(comments); })
        ).toPromise();
    }


    private searchIndexComments(comments: Comment[], commentId: string): number {
        return comments.findIndex(item => item._id === commentId);
    }

}


