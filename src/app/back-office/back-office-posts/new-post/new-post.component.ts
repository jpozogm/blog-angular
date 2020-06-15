import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { ConfirmService } from 'src/app/business/can-deactivated.service';
import { NotificationsBusService } from 'src/app/business/notifications/notifications-bus.service';
import { PostsStoreService } from 'src/app/business/posts/post.store';
import { Post } from 'src/app/business/posts/type/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit, ConfirmService {

  newPost: FormGroup;
  // postCreated: Subscription;
  postCreated: Observable<Post[]>;
  post: Post;
  localStorageUser: string;
  error: string;
  saved: boolean;
  token: string;
  tokenInfo: any;
  postErrorsMessages = {};

  constructor(
    private router: Router,
    private store: PostsStoreService,
    private notificationsBus: NotificationsBusService,
    ) { }

canDeactivate(): boolean{
    if (this.saved === false) {
     return confirm('¿Estás seguro?');
    }
    return true;
  }

  ngOnInit(): void {
    this.newPost = new FormGroup({
      postTittle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      postContent: new FormControl('', [Validators.required, Validators.minLength(5)]),
      postDate:  new FormControl(''),
      postAuthorName: new FormControl(''),
    });
    this.token = localStorage.getItem('token');
    this.tokenInfo = jwt_decode(this.token);
    this.saved = false;

    this.postErrorsMessages = {
      required: 'This field is required',
      minLength: 'Sorry, is too short',
      maxLength: 'Sorry, is too long'
    };
  }


  back(): void {
    this.notificationsBus.showWarn('Your post has not been created', 'Warn Message: ');
    this.router.navigate(['backOffice']);
  }

  save(){
    this.newPost.setControl('postDate', new FormControl(Date.now() ));
    this.newPost.setControl('postAuthorName', new FormControl(this.tokenInfo?.body.user));
    this.newPost.setControl('id', new FormControl(this.tokenInfo?.body.id));
    this.newPost.updateValueAndValidity();

    this.store.create$(this.newPost.value)
    .then((data) => {
      this.saved = true;
      this.notificationsBus.showSuccess('Your post has been created correctly! ✩✩✩', 'Sucess: ');
      this.router.navigate(['backOffice']);
    })
    .catch(
      err => {
        this.error = err.error.message;
        this.notificationsBus.showError('Something was wrong, try it later ✎', 'Error: ');
    });
  }
}




