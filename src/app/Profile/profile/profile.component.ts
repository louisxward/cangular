import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { filter, map, Observable } from 'rxjs'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { LoginService } from 'src/app/Core/services/login/login.service'
import { AuthState, UserState } from 'src/app/Core/state/index'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
	pb: PocketBase

	isAuthenticated$: Observable<boolean>
	userId$: Observable<string>
	avatarUrl$: Observable<string | null>
	username$: Observable<string>
	email$: Observable<string | null>

	loaded = false

	constructor(
		private store: Store,
		private loginService: LoginService,
		private apiService: ApiService
	) {
		this.pb = apiService.pb
	}
	ngOnDestroy(): void {
		this.pb.cancelAllRequests()
	}

	ngOnInit(): void {
		this.userId$ = this.store.select(AuthState.getId).pipe(
			filter((e) => e !== null),
			map((e) => e as string)
		)
		this.avatarUrl$ = this.store.select(UserState.getAvatarUrl)
		this.username$ = this.store.select(UserState.getUsername).pipe(
			filter((e) => e !== null),
			map((e) => e as string)
		)
		this.email$ = this.store.select(UserState.getEmail)
		this.isAuthenticated$ = this.store.select(AuthState.isAuthenticated)
		this.loaded = true
	}
	logout(): void {
		this.loginService.logout()
	}

	checkAuth(): void {
		console.info('ISVALID: ' + this.pb.authStore.isValid)
		console.info('TOKEN: ' + this.pb.authStore.token)
	}

	checkStoreAuth(): void {
		this.isAuthenticated$
			.subscribe((isAuthenticated) => {
				console.info('LOGGEDIN: ' + isAuthenticated)
			})
			.unsubscribe()
		this.userId$
			.subscribe((userId) => {
				console.info('USERID: ' + userId)
			})
			.unsubscribe()
	}
}
