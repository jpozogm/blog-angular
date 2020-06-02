import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsDetailsStoreService } from 'src/app/business/posts/post-details.store';
import { PostsStoreService } from 'src/app/business/posts/post.store';
import { Post } from 'src/app/business/posts/type/post';
import { PostService } from '../../../business/posts/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy, OnChanges{

  @Output() refresh = new EventEmitter();

  editPost: FormGroup;
  subscription: Subscription;
  post$: Post;
  error: string;
  postID: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private store: PostsStoreService,
    private postDetail: PostsDetailsStoreService

  ) {}

  ngOnInit(): void {

    this.store.init();

    this.editPost = new FormGroup({
      postTittle: new FormControl('', [Validators.required, Validators.minLength(5)]),
      postContent: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.postID =  this.activatedRoute.snapshot.paramMap.get('id');
    this.getPostById(this.postID);
  }

  async getPostById(postId) {
    this.post$ = await this.store.getPostById$(postId);
    this.dataForm(this.post$);
  }

  dataForm(post): void{
    this.editPost.patchValue({
      postTittle: post.postTittle,
      postContent: post.postContent
    });
  }

  updatePost(post) {
    this.postDetail.updatePost$(this.postID, post);
    this.refresh.emit();
  }

resetPost(){
    this.editPost.reset();
  }

  ngOnChanges(){
    this.store.init();
  }

ngOnDestroy() {
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
  }
}



