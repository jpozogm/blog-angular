import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Notificacion } from './type/notification';


@Injectable({
  providedIn: 'root'
})

export class NotificationsBusService{

  showNotificacionSource: ReplaySubject<Notificacion>;

  constructor() {
    this.showNotificacionSource = new ReplaySubject<Notificacion>();
  }

  getNotificacion(): Observable<Notificacion> {
    return this.showNotificacionSource.asObservable();
  }

  showError(msg: string, summary?: string) {
    console.log('showError');
    this.show('error', summary, msg);
  }

  showSuccess(msg: string, summary?: string) {
    this.show('success', summary, msg);
  }

  showInfo(msg: string, summary?: string) {
    this.show('info', summary, msg);
  }

  showWarn(msg: string, summary?: string) {
    this.show('warn', summary, msg);
  }

  private show(severity: string, summary: string, msg: string) {
    const notificacion: Notificacion = {
      severity,
      summary,
      detail: msg
    };
    this.notify(notificacion);
  }

  private notify(notificacion: Notificacion): void {
    console.log('notify', notificacion);
    this.showNotificacionSource.next(notificacion);
  }
}
