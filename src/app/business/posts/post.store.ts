import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '../store';
import { PostService } from './post.service';
import { Post } from './type/post';

@Injectable({providedIn: 'root'})

export class PostsStoreService extends Store<Post[]>{

    constructor(private service: PostService) {
        super();
    }

    init(): Promise<Post[]> {
        if (this.get()) { return; }
        return this.service.getPosts().pipe(
            tap(posts => this.store(posts))
        ).toPromise();
    }


    getPostById$(postId: string): Promise<Post> {
        return this.service.getPostByID(postId).pipe(
            tap(postDetail => {
                const posts = this.get();
                const p = Object.assign({}, postDetail);
                const index = this.searchIndex(posts, postId);
                const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
                this.store(newPosts);
            })).toPromise();
    }

    create$(post: Post): Promise<Post> {
        return this.service.saveNewPost(post).pipe(
        tap(newPost => {
            this.store([newPost, ...this.get()]);
            console.log('newPost', newPost);
        }) ).toPromise();
    }

    update$(postId: string, post: Post): Promise<Post> {
        return this.service.updatePost(postId, post).pipe(
            tap(() => {
                const posts = this.get();
                const p = Object.assign({}, post);
                const index = this.searchIndex(posts, postId);
                const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
                this.store(newPosts);
        })
        ).toPromise();
    }

    delete$(postId: string): Promise<Post> {
        return this.service.deletePost(postId).pipe(
            tap(() => {
                const posts = this.get();
                const newPosts = posts.filter(post => post._id !== postId);
                this.store(newPosts);
            })
        ).toPromise();
    }

    private searchIndex(posts: Post[], postId: string): number {
        return posts.findIndex(item => item._id === postId);
    }

}
