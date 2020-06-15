import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsStoreService } from 'src/app/business/posts/post.store';
import { Post } from 'src/app/business/posts/type/post';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {

  publicPosts$: Observable<Post[]>;

  constructor(
    private store: PostsStoreService,
  ) { }

  ngOnInit(): void {
    this.store.init();
    this.publicPosts$ = this.store.get$();
  }

}
