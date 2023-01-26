import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const toastrOptions = {
  tapToDismiss: true,
  positionClass: 'toast-top-right',
  disableTimeOut: true
};

@Injectable()
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  info(message: string) {
    this.toastrService.info(message, '', toastrOptions);
  }

  error(message: string) {
    console.log("NotificationService - ToastrService")
    this.toastrService.error(message, '', toastrOptions);
  }
}