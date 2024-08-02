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
		this.loader.start()
		const value = new FormData()
		value.append(column, file)
		return this.pb.collection(collection).update(id, value)
		.then(()=>{
			this.loader.complete()
			return true
		})
		.catch((error)=>{
			console.error(error)
			this.loader.stop()
			return false
		})
		
	}


	async delete(id: string, collection: string, column: string) {
		console.log('deleteFile()')
		this.loader.start()
		const value = new FormData()
		value.append(column, '')
		return this.pb.collection(collection).update(id, value)
		.then(()=>{
			this.loader.complete()
			return true
		})
		.catch((error)=>{
			console.error(error)
			this.loader.stop()
			return false
		})
	}


	async getFileUrl(userId: string, fileName: string, thumbSize2: string | null){
		console.log('getFileUrl()')
	}

}
