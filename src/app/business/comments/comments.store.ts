import { Injectable } from '@angular/core';
import { PostsStoreService } from '../posts/post.store';
import { Post } from '../posts/type/post';
import { Store } from '../store';
import { CommentService } from './comments.service';
import { Comment } from './type/comment';

@Injectable({providedIn: 'root'})

export class CommentsStoreService extends Store<Comment[]>{

    constructor(
        private service: CommentService,
        private postsStoreService: PostsStoreService, ) {
        super();
    }

    private searchIndexPost(posts: Post[], postId: string): number {
        return posts.findIndex(item => item._id === postId);
    }

    private searchIndexComments(comments: Comment[], commentId: string): number {
        return comments.findIndex(item => item._id === commentId);
    }

}


