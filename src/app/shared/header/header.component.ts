import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  @Input() scroll;

  isLoggued: boolean;

  constructor() { }

  ngOnInit(): void {

    this.isLoggued = false;
  }

  ngDoCheck(){
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggued = true;
    } else {
      this.isLoggued = false;
    }
  }
}
