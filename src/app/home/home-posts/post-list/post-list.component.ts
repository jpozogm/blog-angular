import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BackOfficeProxyService } from 'src/app/back-office/back-office-proxy.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  publicPosts$: Observable<Post>;
  subscription: Subscription;
  commentId: string[];

  constructor(
    private backOfficeProxyService: BackOfficeProxyService,
    private router: Router) { }

  ngOnInit(): void {
    this.publicPosts$ = this.backOfficeProxyService.getPosts();
  }


  showpost(id){
    this.router.navigate([`home/${id}`]);
  }
}
