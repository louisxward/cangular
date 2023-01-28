import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const toastrOptions = {
  tapToDismiss: true,
  positionClass: 'toast-bottom-right',
};

@Injectable()
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  success(message: string) {
    console.log("success()")
    console.log(message)
    this.toastrService.success(message, '', toastrOptions);
  }

  info(message: string) {
    this.toastrService.info(message, '', toastrOptions);
  }

  error(message: string) {
    this.toastrService.error(message, '', toastrOptions);
  }
}