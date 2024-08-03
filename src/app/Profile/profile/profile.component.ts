import { Component } from '@angular/core'
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component'
import { Store } from '@ngxs/store'
import { UserState, AuthState } from 'src/app/Core/state/index'
import PocketBase from 'pocketbase'
import { LoginService } from 'src/app/Core/services/login/login.service'
import { AvatarUploadComponent } from '../components/avatar-upload/avatar-upload.component'
import { ApiService } from 'src/app/Core/services/api/api.service'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
	pb: PocketBase

	isLoggedIn$ = this.store.select(AuthState.isAuthenticated)
	userId$ = this.store.select(AuthState.getId)
	avatarUrl$ = this.store.select(UserState.getAvatarUrl)
	username$ = this.store.select(UserState.getUsername)
	email$ = this.store.select(UserState.getEmail)

	time = new Date()

	constructor(
		private store: Store,
		private loginService: LoginService,
		private apiService: ApiService
	) {
		this.pb = apiService.pb
		setInterval(() => {
			this.time = new Date()
		}, 1)
	}

	logout(): void {
		this.loginService.logout()
	}

	checkAuth(): void {
		console.log('ISVALID: ' + this.pb.authStore.isValid)
		console.log('TOKEN: ' + this.pb.authStore.token)
	}

	checkStoreAuth(): void {
		this.isLoggedIn$.subscribe((f) => {
			console.log('LOGGEDIN: ' + f)
		})
		this.userId$.subscribe((f) => {
			console.log('USERID: ' + f)
		})
	}
}
