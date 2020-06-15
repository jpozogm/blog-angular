import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from '../shared/shared.module';
import { CommentsCardComponent } from './home-comments/comments-card/comments-card.component';
import { CommentsListComponent } from './home-comments/comments-list/comments-list.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomePostsComponent } from './home-posts/home-posts.component';
import { PostCardComponent } from './home-posts/post-card/post-card.component';
import { PostDetailsComponent } from './home-posts/post-details/post-details.component';
import { PostListComponent } from './home-posts/post-list/post-list.component';
import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'post/:id', component: PostDetailsComponent}
];

@NgModule({
  declarations: [
    HomeComponent,
    HomePostsComponent,
    PostListComponent,
    PostCardComponent,
    PostDetailsComponent,
    HomeLayoutComponent,
    CommentsListComponent,
    CommentsCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    AccordionModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    HomeComponent,
    HomePostsComponent,
    PostListComponent,
    PostCardComponent,
    PostDetailsComponent,
    HomeLayoutComponent,
    CommentsListComponent,
    CommentsCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
