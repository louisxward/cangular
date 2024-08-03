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
		return this.pb.collection(collection).getOne(id).
			then((record)=>{
				const fileName = record[column]
				if(null !== fileName && '' !== fileName){
					return fileName
				}
				return null
		})
	}

	async getFileUrl(id: string, collection: string, column: string, size: string | null){
		const value: {[key: string]: any} = {}
		if(null !== size){
			value['thumb'] = size
		}
		return this.pb.collection(collection).getOne(id).
			then((record)=>{
			const fileName = record[column]
			if(null !== fileName && '' !== fileName){// Because file comes back empty sometimes
				return this.pb.getFileUrl(record, fileName, value)
			}
			return null
		})
	}

}
