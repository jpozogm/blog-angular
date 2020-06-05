import { Component, OnInit } from '@angular/core';
import { NotificationsBusService } from './business/notifications/notifications-bus.service';
import { Notificacion } from './business/notifications/type/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-angular';
  msgs: Notificacion[] = [];

  constructor( private notificationsBus: NotificationsBusService) { }

  ngOnInit(){
    this.notificationsBus.getNotificacion().subscribe(
      (notificacion) => {
        this.msgs = [];
        this.msgs.push(notificacion);
    });
  }
}
