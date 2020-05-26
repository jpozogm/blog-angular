import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BackOfficeModule } from './back-office/back-office.module';
import { AuthInterceptorService } from './business/auth-interceptor.service';
import { AuthService } from './business/auth.service';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarLoggedComponent } from './shared/header/navbar-logged/navbar-logged.component';
import { NavbarNoLoggedComponent } from './shared/header/navbar-no-logged/navbar-no-logged.component';

const ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeLayoutComponent, children: [
    {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
  ]},
  {path: 'login',
    loadChildren: () => import('./login/login/login.component').then(m => m.LoginComponent)},
  {path: 'backOffice', canActivate: [AuthService],
    loadChildren: () => import('./back-office/back-office-layout/back-office-layout.component').then(m => m.BackOfficeLayoutComponent)},
  {path: '**', redirectTo: 'home'},
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarNoLoggedComponent,
    NavbarLoggedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomeModule,
    LoginModule,
    BackOfficeModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
