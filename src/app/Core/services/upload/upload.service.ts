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

	async upload(file: File, id: string, collection: string, column: string) {
		console.log('upload()')
		const value = new FormData()
		value.append(column, file)
		return this.pb.collection(collection).update(id, value)
		.then(()=>{
			return true
		})
		.catch((error)=>{
			console.error(error)
			return false
		})
	}

	async getFileUrl(userId: string, fileName: string, thumbSize2: string | null){
		console.log('getFileUrl()')
	}

	deleteFile(userId: string, fileName: string, field: string) {
		console.log('deleteFile()')
	}
}
