import { Injectable } from '@angular/core'
import PocketBase from 'pocketbase'
import { NotificationService } from '../notification/notification.service'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { LoadingBarService } from '@ngx-loading-bar/core'

@Injectable()
export class UploadService {
	pb: PocketBase
	loader = this.loadingBarService.useRef()

	constructor(
		private notificationService: NotificationService,
		private apiService: ApiService,
		private loadingBarService: LoadingBarService
	) {
		this.pb = apiService.pb
	}

	async upload(data: FormData, id: string) {
	}

	async getFileUrl(userId: string, fileName: string, thumbSize2: string | null){

	}

	deleteFile(userId: string, fileName: string, field: string) {
		
	}
}
