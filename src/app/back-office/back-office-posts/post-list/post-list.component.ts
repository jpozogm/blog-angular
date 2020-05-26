import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/business/posts/type/post';
import { PostProxyService } from '../../../business/posts/post-proxy.service';
import { PostService } from '../../../business/posts/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit  {

  privatePosts$: Observable<Post[]>;
  commentId: string[];

  constructor(
    private PostProxyService: PostProxyService,
    private router: Router,
    private PostService: PostService
  ) { }

  ngOnInit(): void {
    this.privatePosts$ = this.PostService.getPosts();
  }

  showpost(id){
    this.router.navigate([`backOffice/post/${id}`]);
  }
}
