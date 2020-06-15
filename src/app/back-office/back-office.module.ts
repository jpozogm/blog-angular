import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { BackOfficeComponent } from '../back-office/back-office/back-office.component';
import { AuthService } from '../business/auth.service';
import { ConfirmService } from '../business/can-deactivated.service';
import { SharedModule } from '../shared/shared.module';
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



const ROUTES: Routes = [
  {path: '', canActivate: [AuthService], component: BackOfficeLayoutComponent},
  {path: 'backOffice', canActivate: [AuthService], component: BackOfficeComponent},
  {path: 'backOffice/post/:id', component: PostDetailsComponent},
  {path: 'newPost', canDeactivate: [ConfirmService], component: NewPostComponent},
  {path: 'backOffice/comment/:id', component: CommentFormComponent},
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
    SharedModule,

    // PrimeNg
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,
    TableModule,
    CardModule,
    FieldsetModule,



    RouterModule.forChild(ROUTES),
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
