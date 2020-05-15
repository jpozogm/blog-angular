import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

const ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeLayoutComponent},
  {path: 'login',
    loadChildren: () => import('./login/login/login.component').then(m => m.LoginComponent)},
  {path: '**', redirectTo: 'home'},
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomeModule,
    LoginModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
