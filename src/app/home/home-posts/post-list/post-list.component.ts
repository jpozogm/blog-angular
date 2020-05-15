import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HomeProxiService } from '../../home-proxi.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  publicPosts$: Observable<any>;
  subscription: Subscription;
  commentId: string[];

  constructor(
    private homeProxiService: HomeProxiService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.homeProxiService.getPosts().subscribe((post) => {this.publicPosts$ = post; console.log(this.publicPosts$);  });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  showpost(id){
    this.router.navigate([`home/${id}`]);
  }
}

