import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfirmService } from '../services/can-deactivated.service';
import { BackOfficeCommentsComponent } from './back-office-comments/back-office-comments.component';
import { CommentFormComponent } from './back-office-comments/comment-form/comment-form.component';
import { NewCommentComponent } from './back-office-comments/new-comment/new-comment.component';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { BackOfficePostsComponent } from './back-office-posts/back-office-posts.component';
import { NewPostComponent } from './back-office-posts/new-post/new-post.component';
import { PostCardComponent } from './back-office-posts/post-card/post-card.component';
import { PostDetailsComponent } from './back-office-posts/post-details/post-details.component';
import { PostFormComponent } from './back-office-posts/post-form/post-form.component';
import { PostListComponent } from './back-office-posts/post-list/post-list.component';
import { BackOfficeComponent } from './back-office/back-office.component';

const ROUTES: Routes = [
  {
    path: '', canActivate: [AuthService],
    component: BackOfficeLayoutComponent,
    children: [
      {
        path: 'backOffice',
        component: BackOfficeComponent
      },
      {
        path: 'backOffice/post/:id',
        component: PostDetailsComponent
      },
      {
      path: 'newPost',
      canDeactivate: [ConfirmService],
      component: NewPostComponent
      },
      {
        path: 'backOffice/comment/:id',
        component: CommentFormComponent
      },
    ]
  }

];

@NgModule({
  declarations: [
    BackOfficeComponent,
    BackOfficeLayoutComponent,
    BackOfficePostsComponent,
    PostCardComponent,
    PostDetailsComponent,
    PostListComponent,
    PostFormComponent,
    NewPostComponent,
    BackOfficeCommentsComponent,
    NewCommentComponent,
    CommentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    BackOfficeComponent,
    BackOfficeLayoutComponent,
    BackOfficePostsComponent,
    PostCardComponent,
    PostDetailsComponent,
    PostListComponent],
})
export class BackOfficeModule { }
