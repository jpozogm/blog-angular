import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsStoreService } from 'src/app/business/posts/post.store';
import { Post } from 'src/app/business/posts/type/post';
import { PostService } from '../../../business/posts/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy{

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
    private store: PostsStoreService
  ) {}

  ngOnInit(): void {

    this.editPost = new FormGroup({
      postTittle: new FormControl('', [Validators.required, Validators.minLength(5)]),
      postContent: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.postID =  this.activatedRoute.snapshot.paramMap.get('id');
    this.getPostById(this.postID);
  }

  async getPostById(postId) {
    console.log(postId);
    this.post$ = await this.store.getPostById$(postId);
    this.dataForm(this.post$);
  }

  dataForm(post): void{
    this.editPost.patchValue({
      postTittle: post.postTittle,
      postContent: post.postContent
    });
  }

  async updatePost(post) {
    this.store.update$(this.postID, post);
    this.refresh.emit();
  }

resetPost(){
    this.editPost.reset();
  }


ngOnDestroy() {
    if (this.subscription) {
    this.subscription.unsubscribe();
    }
  }
}



/*
async updatePost(post) {


  this.subscription = await this.postService.updatePost(this.post._id, post)
  .subscribe((data) => {
    if (data) {
      this.refresh.emit();
    }
  },
    err => {
      this.error = err.error.message;
    },
    () => {
    console.log('Proceso completado'); }
  );
} */
