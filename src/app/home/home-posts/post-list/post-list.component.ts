import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PostService } from 'src/app/business/posts/post.service';
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
    private PostService: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.publicPosts$ = this.PostService.getPosts();
  }


  showpost(id){
    this.router.navigate([`home/${id}`]);
  }
}
