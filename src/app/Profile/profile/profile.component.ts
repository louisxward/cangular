import { Component } from '@angular/core'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { LoginService } from 'src/app/Core/services/login/login.service'
import { AuthState, UserState } from 'src/app/Core/state/index'

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
		console.info('ISVALID: ' + this.pb.authStore.isValid)
		console.info('TOKEN: ' + this.pb.authStore.token)
	}

	checkStoreAuth(): void {
		this.isLoggedIn$.subscribe((f) => {
			console.info('LOGGEDIN: ' + f)
		})
		this.userId$.subscribe((f) => {
			console.info('USERID: ' + f)
		})
	}
}
