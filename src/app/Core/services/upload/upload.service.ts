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
		.then((e)=>{
			this.loader.complete()
			return e.avatar
		})
		.catch((error)=>{
			console.error(error)
			this.loader.stop()
			return null
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

	async getFileName(id: string, collection: string, column: string): Promise<string | null>{
		console.log('getFileUrl()')
		return this.pb.collection(collection).getOne(id).
			then((record)=>{
			return record[column] //Hmm not sure on the types here
		})
	}

	async getFileUrl(id: string, collection: string, column: string){
		console.log('getFileUrl()')
		return this.pb.collection(collection).getOne(id).
			then((record)=>{
			const fileName = record[column]
			if(null !== fileName){
				return this.pb.getFileUrl(record, fileName, {})// Fix 'thumb': '100x250'
			}
			return null
		})
	}

}
