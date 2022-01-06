export class NotificationMessage {
  message: string = '';
  type!: NotificationType;
}

export enum NotificationType {
  success = 200,
  error = 500,
}
