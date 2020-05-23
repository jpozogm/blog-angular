import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmService } from 'src/app/services/can-deactivated.service';
import { Post } from 'src/app/types/post';
import { BackOfficeProxyService } from '../../back-office-proxy.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit, ConfirmService, OnDestroy {

  newPost: FormGroup;
  postCreated: Subscription;
  post: Post;
  localStorageUser: string;
  error: string;
  saved: boolean;

  constructor(
    private router: Router,
    private backOfficeProxiService: BackOfficeProxyService,
    ) { }

canDeactivate(): boolean{
    if (this.saved === false) {
     return confirm('¿Estás seguro?');
    }
    return true;
  }

  ngOnInit(): void {
    this.newPost = new FormGroup({
      postTittle: new FormControl('', [Validators.required, Validators.minLength(5)]),
      postContent: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.localStorageUser = localStorage.getItem('user');
    this.saved = false;
  }


  back(): void {
    this.router.navigate(['backOffice']);
  }

  async save(){
    this.postCreated = await this.backOfficeProxiService.saveNewPost(this.newPost.value).subscribe((data) => {
      if (data) {
        this.router.navigate(['backOffice']);
        this.saved = true;
      }
      },
      err => {
        this.error = err.error.message;
      },
      () => {
      console.log('Proceso completado'); }
    );
  }

  ngOnDestroy() {
    if (this.postCreated) {
      this.postCreated.unsubscribe();
    }
  }
}

