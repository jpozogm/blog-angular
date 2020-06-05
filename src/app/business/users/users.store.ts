import { Injectable } from '@angular/core';
import { CommentService } from '../comments/comments.service';
import { Store } from '../store';
import { LoginService } from './login.service';
import { User } from './types/User';

@Injectable({ providedIn: 'root' })

export class UserStoreService extends Store<User[]>{

    constructor(
        private service: LoginService,
        private commentService: CommentService, ) {
        super();
    }
/*

    signIn(login): Observable<Token> {
        return this.service.signIn(login).pipe(
          tap(user =>{
              console.log(user)
          })
        ).toPromise();
    }

    signUp(user: User): Observable<User[]> {
        return this.service.signUp(user).pipe(
          map(newUser =>{
            console.log(newUser)
          })
        );
    }

    checkUserByname(name): Observable<User[]>{
        return this.service.checkUserByname(name).pipe(
            tap(user =>{
                const users = this.get();
                const p = Object.assign({}, user);
                const index = this.searchIndex(posts, postId);
                const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
                this.store(newPosts);
            })
        ).toPromise();
    } */

}
