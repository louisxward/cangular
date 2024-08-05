import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { filter, map } from 'rxjs/operators'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { SocialService } from 'src/app/Core/services/social/social.service'
import { UploadService } from 'src/app/Core/services/upload/upload.service'
import { AuthState } from 'src/app/Core/state/auth/auth.state'

@Component({
	selector: 'app-userDetails',
	templateUrl: './userDetails.component.html',
	styleUrls: ['./userDetails.component.scss'],
})
export class UserDetailsComponent implements OnInit {
	pb: PocketBase
	loader: LoadingBarState
	userDetailsId: string
	found: boolean = false
	avatarUrl: string | null = null
	lastLoggedIn: string | null = null
	currentUserId: string
	currentUser: boolean = false // if the authd user is editing their own details
	followingId: string | null = null // if the user is following the authd user
	mutuals: boolean = false

	userDetails = {
		// ToDo - This can be improved with interfaces?
		id: '0',
		username: '',
		email: '',
	}

	constructor(
		private apiService: ApiService,
		private loadingBarService: LoadingBarService,
		private route: ActivatedRoute,
		private uploadService: UploadService,
		private socialService: SocialService,
		private store: Store
	) {
		console.log('UserDetailsComponent Init')
		this.pb = this.apiService.pb
		this.loader = this.loadingBarService.useRef()
		const param = this.route.snapshot.paramMap.get('userId')
		this.userDetailsId = param ? param : '0'
	}

	ngOnInit(): void {
		this.store
			.select(AuthState.getId)
			.pipe(
				filter((e) => e !== null),
				map((e) => e as string)
			)
			.subscribe((e) => {
				this.currentUserId = e
			})
		if (this.userDetailsId == '0') {
			this.found = true
		} else {
			this.getUser().then((found) => {
				this.found = found
				this.currentUser = this.currentUserId == this.userDetailsId
				this.checkSocial()
			})
		}
	}

	checkSocial() {
		if (!this.currentUser) {
			// check if authd user follows this user
			this.socialService
				.checkFollowing(this.currentUserId, this.userDetailsId)
				.then((e) => {
					this.followingId = e
					if (e) {
						// check if this user follows authd user
						this.socialService
							.checkFollowing(this.userDetailsId, this.currentUserId)
							.then((f) => {
								this.mutuals = null != f
							})
					}
				})
		}
	}

	followUser() {
		this.loader.start()
		this.socialService
			.follow(this.currentUserId, this.userDetailsId)
			.then((e) => {
				this.followingId = e
				// Check if user we followed follows us back
				this.socialService
					.checkFollowing(this.userDetailsId, this.currentUserId)
					.then((f) => {
						this.mutuals = null != f
					})
				this.loader.complete()
			})
			.catch((e) => {
				console.error(e)
				this.loader.stop()
			})
	}

	unfollowUser() {
		if (null != this.followingId) {
			this.loader.start()
			this.socialService
				.unfollow(this.followingId)
				.then((e) => {
					this.followingId = e
					this.mutuals = false
					this.loader.complete()
				})
				.catch((e) => {
					console.error(e)
					this.loader.stop()
				})
		}
	}

	// ToDo - fix window refresh issue
	getUser() {
		this.loader.start()
		return this.pb
			.collection('users')
			.getOne(this.userDetailsId, {})
			.then((record) => {
				this.userDetails = {
					id: record.id,
					username: record.username,
					email: record.email,
				}
				this.lastLoggedIn = record.lastLoggedIn
				this.uploadService
					.getFileUrl(record.id, 'users', 'avatar', '200x200')
					.then((url) => {
						this.avatarUrl = url
					})
				this.loader.complete()
				return true
			})
			.catch((error) => {
				console.error(error)
				this.loader.stop()
				return false
			})
	}
}
