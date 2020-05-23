import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    HomeLayoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    HomeComponent,
    HomePostsComponent,
    PostListComponent,
    PostCardComponent,
    PostDetailsComponent,
    HomeLayoutComponent]
})
export class HomeModule { }
