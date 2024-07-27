import { Injectable } from '@angular/core'
import PocketBase from 'pocketbase'
import { NotificationService } from '../notification/notification.service'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { LoadingBarService } from '@ngx-loading-bar/core'

@Injectable()
export class DownloadService {
	async getThumb(fileUrl: string | null, thumbSize: string | null) {
		if (null != fileUrl && null != thumbSize) {
			return fileUrl + thumbSize
		}
		return null
	}
}
