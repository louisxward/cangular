import { Injectable } from '@angular/core'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { NotificationService } from '../notification/notification.service'

@Injectable()
export class UploadService {
	pb: PocketBase
	loader: LoadingBarState

	constructor(
		private notificationService: NotificationService,
		private apiService: ApiService,
		private loadingBarService: LoadingBarService
	) {
		this.pb = this.apiService.pb
		this.loader = this.loadingBarService.useRef()
	}

	async upload(
		file: File,
		id: string,
		collection: string,
		column: string
	): Promise<string | null> {
		this.loader.start()
		const value = new FormData()
		value.append(column, file)
		return this.pb
			.collection(collection)
			.update(id, value)
			.then((record) => {
				this.loader.complete()
				this.notificationService.success('file uploaded')
				return record[column]
			})
			.catch((error) => {
				console.error(error)
				this.loader.stop()
				this.notificationService.error('file upload failed')
				return null
			})
	}

	async delete(id: string, collection: string, column: string) {
		this.loader.start()
		const value = new FormData()
		value.append(column, '')
		return this.pb
			.collection(collection)
			.update(id, value)
			.then(() => {
				this.loader.complete()
				this.notificationService.success('file deleted')
				return true
			})
			.catch((error) => {
				console.error(error)
				this.loader.stop()
				this.notificationService.error('file delete failed')
				return false
			})
	}

	async getFileName(
		id: string,
		collection: string,
		column: string
	): Promise<string | null> {
		return this.pb
			.collection(collection)
			.getOne(id)
			.then((record) => {
				const fileName = record[column]
				if (null !== fileName && '' !== fileName) {
					return fileName
				}
				return null
			})
	}

	async getFileUrl(
		id: string,
		collection: string,
		column: string,
		size: string | null
	) {
		const query: { [key: string]: any } = {}
		if (null !== size) {
			query['thumb'] = size
		}
		return this.pb
			.collection(collection)
			.getOne(id)
			.then((record) => {
				const fileName = record[column]
				if (null !== fileName && '' !== fileName) {
					// Because file comes back empty sometimes
					return this.pb.getFileUrl(record, fileName, query)
				}
				return null
			})
	}
}
