import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PostsStoreService } from 'src/app/business/posts/post.store';
import { Post } from 'src/app/business/posts/type/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  publicPosts$: Observable<Post[]>;
  subscription: Subscription;
  commentId: string[];

  constructor(
    private store: PostsStoreService,
    private router: Router) { }

  ngOnInit(): void {
    this.store.init();
    this.publicPosts$ = this.store.get$();
  }


  showpost(id){
    this.router.navigate([`home/${id}`]);
  }

  routerLink(){
    console.log('hello');
  }
}
