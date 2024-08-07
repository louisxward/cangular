import { Component, OnInit } from '@angular/core'
import { Store } from '@ngxs/store'
import { filter, map } from 'rxjs/operators'
import { UploadService } from 'src/app/Core/services/upload/upload.service'
import { AuthState } from 'src/app/Core/state'
import { User } from 'src/app/Core/state/user'

@Component({
	selector: 'app-avatar-upload',
	templateUrl: './avatar-upload.component.html',
	styleUrls: ['./avatar-upload.component.scss'],
})
export class AvatarUploadComponent implements OnInit {
	id: string
	uploadedFileName: string | null = null
	collection = 'users'
	column = 'avatar'

	pending: boolean = false
	loaded: boolean = false

	constructor(private store: Store, private uploadService: UploadService) {}

	async ngOnInit(): Promise<void> {
		this.store
			.select(AuthState.getId)
			.pipe(
				filter((e) => e !== null), // Filter out null values
				map((e) => e as string) // Type assertion here
			)
			.subscribe((e) => {
				this.id = e
			})
			.unsubscribe()
		await this.uploadService
			.getFileName(this.id, this.collection, this.column)
			.then((e) => {
				this.uploadedFileName = e
			})
		this.loaded = true
	}

	onChange(event: any) {
		this.upload(event.target.files[0])
	}

	async upload(file: File) {
		this.pending = true
		await this.uploadService
			.upload(file, this.id, this.collection, this.column)
			.then(async (fileName) => {
				if (fileName) {
					// ToDo - Tidy up
					this.uploadedFileName = fileName
					let avatarUrl: string | null = null
					await this.uploadService
						.getFileUrl(this.id, this.collection, this.column, '200x200')
						.then((url) => {
							avatarUrl = url
						})

					let smallAvatarUrl: string | null = null
					await this.uploadService
						.getFileUrl(this.id, this.collection, this.column, '200x200')
						.then((url) => {
							smallAvatarUrl = url
						})
					this.store.dispatch(
						new User.Update.Avatar({
							avatarUrl: avatarUrl,
							smallAvatarUrl: smallAvatarUrl,
						})
					)
				}
			})
		this.pending = false
	}

	async delete() {
		this.pending = true
		await this.uploadService
			.delete(this.id, this.collection, this.column)
			.then((e) => {
				if (e) {
					this.uploadedFileName = null
					this.store.dispatch(
						new User.Update.Avatar({ avatarUrl: null, smallAvatarUrl: null })
					)
				}
			})
		this.pending = false
	}
}
