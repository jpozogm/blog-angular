import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsStoreService } from 'src/app/business/posts/post.store';
import { Post } from 'src/app/business/posts/type/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy  {

  privatePosts$: Observable<Post[]>;
  commentId: string[];


  constructor(
    private router: Router,
    private store: PostsStoreService,
  ) { }

  ngOnInit(): void {
    this.store.init();
    this.privatePosts$ = this.store.get$();

    window.scroll(100, 0);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  showpost(id){
    this.router.navigate([`backOffice/post/${id}`]);
  }


  ngOnDestroy() {
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }
}
