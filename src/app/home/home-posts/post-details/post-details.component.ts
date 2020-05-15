import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/types/post';
import { HomeProxiService } from '../../home-proxi.service';

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
    private homeProxiService: HomeProxiService ) { }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.homeProxiService.getPostByID(params.id).subscribe((data) => {
        this.post = data; console.log(this.post); });
  });
}

/* ngOnInit(): void {

  this.subscription = this.activatedRoute.params.subscribe((params) => {
    this.homeProxiService.getPostByID(params.id).subscribe((data) => {
      this.post = data; console.log(this.post); });
});
} */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
