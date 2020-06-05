import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../app/shared/shared.module';
import { AppComponent } from './app.component';
import { BackOfficeModule } from './back-office/back-office.module';
import { AuthInterceptorService } from './business/auth-interceptor.service';
import { AuthService } from './business/auth.service';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

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

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomeModule,
    LoginModule,
    BackOfficeModule,
    SharedModule,

    // primeNG
/*     ToastModule,
    MessagesModule,
    MessageModule, */

    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {provide: MessageService},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
