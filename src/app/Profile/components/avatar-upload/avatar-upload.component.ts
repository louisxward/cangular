import { Component, OnInit } from '@angular/core'
import { UploadService } from 'src/app/Core/services/upload/upload.service'
import { Store } from '@ngxs/store'
import { User, UserState } from 'src/app/Core/state/user'
import { AuthState } from 'src/app/Core/state'
import { map, filter } from 'rxjs/operators'

@Component({
	selector: 'app-avatar-upload',
	templateUrl: './avatar-upload.component.html',
	styleUrls: ['./avatar-upload.component.scss'],
})
export class AvatarUploadComponent implements OnInit {
	pending: boolean = false
	id: string
	uploadedFileName: string | null = null;
	collection: 'users'
	column = 'avatar'

	constructor(
		private store: Store,
		private uploadService: UploadService,
	) {
	}

	ngOnInit(): void {
		this.store.select(AuthState.getId)
		.pipe(
			filter((e) => e !== null), // Filter out null values
			map((e) => e as string) // Type assertion here
		)
		.subscribe(e=>{
			this.id = e
		})
		this.uploadService.getFileName(this.id, this.collection, this.column).then((e)=>{
			this.uploadedFileName = e
		})
	}

	onChange(event: any) {
		console.log('onChange()')
		this.upload(event.target.files[0])
	}

	async upload(file: File) {
		console.log('onUpload()')
		this.pending = true
		await this.uploadService.upload(file, this.id, this.collection, this.column).then((e)=>{
			if(e){
				this.uploadedFileName = file.name
				this.uploadService.getFileUrl(this.id, this.collection, this.column)
				.then((url)=>{
					this.store.dispatch(new User.Update.Avatar({url}))
				})	
			}
		})
		this.pending = false
	}

	async delete() {
		console.log('delete()')
		this.pending = true
		await this.uploadService.delete(this.id, this.collection, this.column).then((e)=>{
			if(e){
				this.uploadedFileName = null
				this.store.dispatch(new User.Update.Avatar({url: null}))
			}
		})
		this.pending = false
	}
}
