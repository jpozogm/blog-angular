import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { HeaderComponent } from './header/header.component';
import { NavbarLoggedComponent } from './header/navbar-logged/navbar-logged.component';
import { NavbarNoLoggedComponent } from './header/navbar-no-logged/navbar-no-logged.component';


@NgModule({
  declarations: [ErrorMessagesComponent, HeaderComponent, NavbarLoggedComponent, NavbarNoLoggedComponent] ,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [ErrorMessagesComponent, HeaderComponent, NavbarLoggedComponent, NavbarNoLoggedComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
