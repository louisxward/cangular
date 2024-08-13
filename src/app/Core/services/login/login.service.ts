import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { NotificationService } from 'src/app/Core/services/notification/notification.service'
import { AuthState, Login, Logout, User } from 'src/app/Core/state/index' // Hmm not keen on this not sure how it knows which Login action to use. Probs will error if it can pick more than one
import { UploadService } from '../upload/upload.service'

@Injectable()
export class LoginService {
	pb: PocketBase
	loader: LoadingBarState
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
		this.loader = this.loadingBarService.useRef()
		this.store
			.select(AuthState.isAuthenticated)
			.subscribe((e) => {
				this.loggedIn = new BehaviorSubject<boolean>(e)
			})
			.unsubscribe()
	}

	async login(username: string, password: string): Promise<boolean> {
		// ToDo - Tidy upppppp
		this.loader.start()
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
				this.setLastLoggedIn(authRecord.record.id)
				this.router.navigate(['/profile'])
				this.notificationService.success('welcome ' + authRecord.record.username)
				this.loggedIn.next(true)
				this.loader.complete()
				return true
			})
			.catch(() => {
				this.loader.stop()
				return false
			})
	}

	onLoginChange() {
		console.log('LoginService.onLoginChange()')
		return this.loggedIn.asObservable()
	}

	logout(force: boolean) {
		this.store.dispatch(new User.Login.Logout())
		this.store.dispatch(new Logout())
		this.pb.authStore.clear()
		this.pb.cancelAllRequests()
		this.notificationService.success(force ? 'timed out' : 'logged out')
		this.router.navigate(['/login'])
		this.loggedIn.next(false)
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
