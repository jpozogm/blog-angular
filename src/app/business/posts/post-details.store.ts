import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CommentService } from '../comments/comments.service';
import { Comment } from '../comments/type/comment';
import { Store } from '../store';
import { PostService } from './post.service';
import { PostsStoreService } from './post.store';
import { Post } from './type/post';

@Injectable({providedIn: 'root'})

export class PostsDetailsStoreService extends Store<Post>{

    constructor(
        private commentService: CommentService,
        private postService: PostService,
        private postStore: PostsStoreService) {
        super();
    }

    init(id): Promise<Post>{
        return this.postService.getPostByID(id).pipe(tap(post => this.store(post)))
        .toPromise();
    }

    getCommentById$(id: string): Promise<Post> {
        return this.commentService.getCommentByID(id).pipe(
            tap(postDetail => {
                const post = this.get();
                const index = this.searchIndex(post.postComments, id);
                const comment = post.postComments[index];
                this.store(comment);
            })).toPromise();
    }


    saveNewComment$(id: string, comment: Comment): Promise<Post> {
        return this.commentService.saveNewComment(id, comment).pipe(
        tap(newComment => {
            const post = this.get();
            const foo = { _id: id, ...post };
            const newComments = [...post.postComments, newComment];
            const newPost = {...post, postComments: newComments };
            this.store(newPost);
        })).toPromise();
    }

    deleteComment$(id: string): Promise<Post> {
        return this.commentService.deleteComment(id).pipe(
            tap(() => {
                const post = this.get();
                const newPosts = post.postComments.filter(comment => comment._id !== id);
                const newPost = {...post, postComments: newPosts };
                this.store(newPost);
            })
        ).toPromise();
    }

    updateComment$(id: string, comment: Comment): Promise<Post> {
        return this.commentService.updateComment(id, comment).pipe(
            tap(newComment => {
                const post = this.get();
                const c = Object.assign({}, newComment);
                this.store(c);
            })
        ).toPromise();
    }

    updatePost$(postId: string, post: Post): Promise<Post> {
        return this.postService.updatePost(postId, post).pipe(
            tap((newPost) => {
                const postUpdate = this.get();
                const p = Object.assign({}, newPost);
                const updatePost = {...p, postComments: postUpdate.postComments};
                this.store(updatePost);
                this.postStore.updatePost$(updatePost);
        })
        ).toPromise();
    }


    private searchIndex(posts: Post[], postId: string) {
        return posts.findIndex(item => item._id === postId);
    }
    private searchIndexComments(comments: Comment[], commentId: string) {
        return comments.findIndex(item => item._id === commentId);
    }
}

