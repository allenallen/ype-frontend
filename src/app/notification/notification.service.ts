import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Response } from '../base/response';
import { NotificationMessage, NotificationType } from './notification-response';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject: Subject<Response<any>> = new Subject<
    Response<any>
  >();

  constructor(private toastrService: ToastrService) {
    this.notificationSubject.subscribe(
      (message) => {
        switch (message.code) {
          case NotificationType.success:
            this.toastrService.success(message.message);
            break;
          case NotificationType.error:
            this.toastrService.error(message.message);
            break;
        }
      },
      (error) => {
        console.log('Notification error');
      }
    );
  }

  sendNotification(response: Response<any>) {
    this.notificationSubject.next(response);
  }
}
