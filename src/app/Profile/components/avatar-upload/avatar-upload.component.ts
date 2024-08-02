import { Component, OnInit } from '@angular/core'
import { UploadService } from 'src/app/Core/services/upload/upload.service'
import { AuthGuardService } from 'src/app/Core/services/auth/auth-guard.service'
import { UserService } from 'src/app/Core/services/user/user.service'
import { Store } from '@ngxs/store'
import { User, UserState } from 'src/app/Core/state/user'

@Component({
	selector: 'app-avatar-upload',
	templateUrl: './avatar-upload.component.html',
	styleUrls: ['./avatar-upload.component.scss'],
})
export class AvatarUploadComponent implements OnInit {
	loading: boolean = false
	pending: boolean = false
	file: File = new File([], '', {})
	avatarFileName$ = this.store.select(UserState.getAvatarFileName)
	userId$ = this.store.select(UserState.getId)

	constructor(
		private store: Store,
		private uploadService: UploadService,
		private authGuardService: AuthGuardService,
		private userService: UserService
	) {}

	ngOnInit(): void {}

	onChange(event: any) {
		this.file = event.target.files[0]
		this.pending = true
		this.onUpload()
	}

	async onUpload() {
		console.log('onUpload()')
		this.loading = true
		let fileName = ''
		const formData = new FormData()
		formData.append('avatar', this.file)
		this.userId$.subscribe((e) => {
			this.uploadService
				.upload(formData, e)
				.then((value: string) => (fileName = value))
			this.store.dispatch(
				new User.Update.Avatar({
					id: e,
					fileName: fileName,
				})
			)
		})
		this.loading = false
		this.pending = false
		this.file = new File([], '', {})
	}

	delete() {
		console.log('delete()')
		this.file = new File([], '', {})
		this.pending = false

		this.userId$.subscribe((e) => {
			this.store.dispatch(
				new User.Update.Avatar({
					id: e,
					fileName: '',
				})
			)
		})
	}
}
