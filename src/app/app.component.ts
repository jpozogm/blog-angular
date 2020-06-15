import { Component, HostListener, OnInit } from '@angular/core';
import { NotificationsBusService } from './business/notifications/notifications-bus.service';
import { Notificacion } from './business/notifications/type/notification';

declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-angular';
  msgs: Notificacion[] = [];

  constructor( private notificationsBus: NotificationsBusService) { }
  scroll;


  ngOnInit(){
    this.notificationsBus.getNotificacion().subscribe(
      (notificacion) => {
        this.msgs = [];
        this.msgs.push(notificacion);

        setTimeout(() => {
          this.msgs = [];
        }, 3000);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (position >= 50) {
      this.scroll = true;
      }
    if (position === 0) {
      this.scroll = false;
    }

  }

}


