import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

const toastrOptions = {
	tapToDismiss: true,
	positionClass: 'toast-bottom-right',
	easeTime: 500,
}

const toastrOptionsPersist = {
	tapToDismiss: true,
	positionClass: 'toast-bottom-right',
	disableTimeOut: true,
	closeButton: true,
	easeTime: 500,
}

@Injectable()
export class NotificationService {
	constructor(private toastrService: ToastrService) {}

	success(message: string) {
		this.toastrService.success(message, '', toastrOptions)
	}

	info(message: string) {
		this.toastrService.info(message, '', toastrOptions)
	}

	error(message: string) {
		this.toastrService.error(message, '', toastrOptionsPersist)
	}
}
