import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import { UploadService } from 'src/app/Core/services/upload/upload.service'

@Component({
	selector: 'app-userDetails',
	templateUrl: './userDetails.component.html',
	styleUrls: ['./userDetails.component.scss'],
})
export class UserDetailsComponent {
	pb: PocketBase
	loader: LoadingBarState
	userDetailsId: string
	found: boolean = false
	avatarUrl: string | null = null
	lastLoggedIn: string | null = null

	userDetails = {// ToDo - This can be improved with interfaces?
		id: '',
		username: '',
		email: '',
	}

	constructor(
		private apiService: ApiService,
		private loadingBarService: LoadingBarService,
		private route: ActivatedRoute,
		private uploadService: UploadService
	) {
		this.pb = this.apiService.pb
		this.loader = this.loadingBarService.useRef()
		const param = this.route.snapshot.paramMap.get('userId')
		this.userDetailsId = param ? param : '0'
	}

	ngOnInit() {
		if(this.userDetailsId == '0'){
			this.found = true
		} else {
			this.getUser().then((e)=>{
				this.found = e
			})
		}
	}

	async getUser(){
		this.loader.start()
		return this.pb.collection('users').getOne(this.userDetailsId, {}).then((record)=>{
			this.userDetails = {
				id: record.id,
				username: record.username,
				email: record.email
			}
			this.lastLoggedIn = record.lastLoggedIn
			this.uploadService.getFileUrl(record.id, 'users', 'avatar', '200x200').then((url) => {
				this.avatarUrl = url
			})
			this.loader.complete()			
			return true
		}).catch((error)=>{
			console.error(error)
			this.loader.stop()
			return false
		})
	}
}
