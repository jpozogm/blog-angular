import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackOfficeProxyService } from '../../back-office-proxy.service';
import { BackOfficeService } from '../../back-office.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit  {

  privatePosts$: Observable<any>;
  commentId: string[];

  constructor(
    private backOfficeproxyService: BackOfficeProxyService,
    private router: Router,
    private backOfficeService: BackOfficeService
  ) { }

  ngOnInit(): void {
    this.privatePosts$ = this.backOfficeproxyService.getPosts();
  }

  showpost(id){
    this.router.navigate([`backOffice/post/${id}`]);
  }
}
