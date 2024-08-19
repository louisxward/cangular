import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { NotificationService } from 'src/app/Core/services/notification/notification.service'
import {
	AuthState,
	Login,
	Logout,
	UpdateRoleGroups,
	User,
} from 'src/app/Core/state/index' // Hmm not keen on this not sure how it knows which Login action to use. Probs will error if it can pick more than one
import { LoadingBarService } from '../loading-bar/loading-bar.service'
import { UploadService } from '../upload/upload.service'

@Injectable()
export class LoginService {
	pb: PocketBase
	loggedIn: BehaviorSubject<boolean>

	constructor(
		private store: Store,
		private router: Router,
		private notificationService: NotificationService,
		private apiService: ApiService,
		private loadingBarService: LoadingBarService,
		private uploadService: UploadService
	) {
		this.pb = this.apiService.pb
		this.store
			.select(AuthState.isAuthenticated)
			.subscribe((e) => {
				this.loggedIn = new BehaviorSubject<boolean>(e)
			})
			.unsubscribe()
	}

	async login(username: string, password: string): Promise<boolean> {
		// ToDo - Tidy upppppp
		this.loadingBarService.start()
		const myPromise = this.pb
			.collection('users')
			.authWithPassword(username, password)
		return myPromise
			.then(async (authRecord) => {
				const avatarUrl = await this.uploadService.getFileUrl(
					authRecord.record.id,
					'users',
					'avatar',
					'200x200'
				)
				const smallAvatarUrl = await this.uploadService.getFileUrl(
					authRecord.record.id,
					'users',
					'avatar',
					'30x30'
				)
				this.store.dispatch(
					new User.Login.Login({
						record: authRecord.record,
						avatarUrl: avatarUrl,
						smallAvatarUrl: smallAvatarUrl,
					})
				)
				this.store.dispatch(
					new Login({
						record: authRecord,
					})
				)
				this.store.dispatch(
					new UpdateRoleGroups({
						record: [],
					})
				)
				this.setLastLoggedIn(authRecord.record.id)
				this.router.navigate(['/profile'])
				this.notificationService.success('welcome ' + authRecord.record.username)
				this.loggedIn.next(true)
				this.loadingBarService.complete()
				return true
			})
			.catch(() => {
				this.loadingBarService.error()
				return false
			})
	}

	onLoginChange() {
		return this.loggedIn.asObservable()
	}

	logout(force: boolean) {
		this.store.dispatch(new User.Login.Logout())
		this.store.dispatch(new Logout())
		this.pb.authStore.clear()
		this.pb.cancelAllRequests()
		this.loggedIn.next(false)
		if (!force) {
			this.notificationService.success('logged out')
		} else {
			console.error('login expired')
			this.notificationService.error('login expired')
		}
		this.router.navigate(['/login'])
	}

	setLastLoggedIn(id: string) {
		this.pb.collection('users').update(id, { lastLoggedIn: new Date() })
	}

	async checkAuth() {
		if (!this.pb.authStore.isValid) {
			return false
		}
		return await this.pb
			.collection('users')
			.authRefresh()
			.then(() => {
				return true
			})
			.catch((error) => {
				console.error(error)
				return false
			})
	}

	testAuth() {
		console.log(this.pb.authStore.isValid)
		console.log(this.pb.authStore.token)
		console.log(this.pb.authStore.model)
	}
}
