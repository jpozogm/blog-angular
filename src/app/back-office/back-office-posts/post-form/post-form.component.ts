import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/types/post';
import { BackOfficeProxyService } from '../../back-office-proxy.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy{

  @Output() refresh = new EventEmitter();

  editPost: FormGroup;
  subscription: Subscription;
  post: Post;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private backOfficeproxyService: BackOfficeProxyService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.editPost = new FormGroup({
      postTittle: new FormControl('', [Validators.required, Validators.minLength(5)]),
      postContent: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.backOfficeproxyService.getPostByID(params.id).subscribe((data) => {
        this.post = data; this.dataForm(this.post); });
    });
  }

  dataForm(post): void{
    this.editPost.patchValue({
      postTittle: post.postTittle,
      postContent: post.postContent
    });
  }

  async updatePost(post) {

    this.subscription = await this.backOfficeproxyService.updatePost(this.post._id, post)
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
