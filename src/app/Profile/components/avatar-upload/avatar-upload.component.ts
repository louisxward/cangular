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
	loading: boolean = false
	pending: boolean = false
	id: string
	uploadedFileName: string | null = null;

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
	}

	onChange(event: any) {
		console.log('onChange()')
		this.pending = true
		this.upload(event.target.files[0])// ToDo - Do remove or upload change here?
	}

	async upload(file: File) {
		console.log('onUpload()')
		this.uploadService.upload(file, this.id, 'users', 'avatar').then((e)=>{
			if(e){
				this.uploadedFileName = file.name
			}
		})
	}

	async delete() {
		console.log('delete()')
	}
}
