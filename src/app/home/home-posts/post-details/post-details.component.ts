import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackOfficeProxyService } from 'src/app/back-office/back-office-proxy.service';
import { Post } from 'src/app/types/post';

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
    private backOfficeProxyService: BackOfficeProxyService ) { }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.backOfficeProxyService.getPostByID(params.id).subscribe((data) => {
        this.post = data; console.log(this.post); });
    });
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
