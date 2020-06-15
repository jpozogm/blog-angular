import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-no-logged',
  templateUrl: './navbar-no-logged.component.html',
  styleUrls: ['./navbar-no-logged.component.scss']
})
export class NavbarNoLoggedComponent implements OnInit {

  @Input() scroll;

  constructor() { }

  ngOnInit(): void {
  }

  scrollUp(){
    window.scroll(100, 0);
  }

}
