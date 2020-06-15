import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/business/posts/post.service';
import { Post } from 'src/app/business/posts/type/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  post: Post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService
     ) { }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.postService.getPostByID(params.id).subscribe((data) => {
        this.post = data; });
    });
    window.scroll(100, 0);
  }

  backHome(){
    this.router.navigate(['home']);
  }

  ngOnDestroy() {
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
  }
}
