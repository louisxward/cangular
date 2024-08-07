import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import { Store } from '@ngxs/store'
import { filter, map } from 'rxjs/operators'
import { SocialService } from 'src/app/Core/services/social/social.service'
import { UploadService } from 'src/app/Core/services/upload/upload.service'
import { User, UserService } from 'src/app/Core/services/user/user.service'
import { AuthState } from 'src/app/Core/state/auth/auth.state'

@Component({
	selector: 'app-userDetails',
	templateUrl: './userDetails.component.html',
	styleUrls: ['./userDetails.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
	loader: LoadingBarState

	userDetailsId: string
	found: boolean = false
	avatarUrl: string | null = null
	lastLoggedIn: string | null = null
	currentUserId: string
	currentUser: boolean = false // if the authd user is editing their own details
	followingId: string | null = null // if the user is following the authd user
	mutuals: boolean = false

	loaded: boolean = false

	userDetails: User = {
		id: '0',
		username: '',
		email: null,
		lastLoggedIn: null,
	}

	constructor(
		private loadingBarService: LoadingBarService,
		private route: ActivatedRoute,
		private uploadService: UploadService,
		private socialService: SocialService,
		private userService: UserService,
		private store: Store
	) {
		this.loader = this.loadingBarService.useRef()
		const param = this.route.snapshot.paramMap.get('userId')
		this.userDetailsId = param ? param : '0'
	}
	ngOnDestroy(): void {
		this.loader.stop
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
			.unsubscribe()
		if (this.userDetailsId == '0') {
			this.found = true
			this.loaded = true
		} else {
			this.getUser().then(async (found: boolean) => {
				this.found = found
				this.currentUser = this.currentUserId == this.userDetailsId
				await this.checkSocial()
				this.loaded = true
			})
		}
	}

	async checkSocial() {
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
			.then((followingId) => {
				this.followingId = followingId
				if (this.followingId) {
					this.socialService
						.checkFollowing(this.userDetailsId, this.currentUserId)
						.then((mutuals) => {
							this.mutuals = null != mutuals
						})
				}
				this.loader.complete()
			})
	}

	unfollowUser() {
		if (null != this.followingId) {
			this.loader.start()
			this.socialService.unfollow(this.followingId).then((followingId) => {
				this.followingId = followingId
				if (!this.followingId) {
					this.mutuals = false
				}
				this.loader.complete()
			})
		}
	}

	async getUser() {
		this.loader.start()
		return this.userService.getUser(this.userDetailsId).then((record) => {
			if (record) {
				this.userDetails = {
					id: record.id,
					username: record.username,
					email: record.email,
					lastLoggedIn: record.lastLoggedIn,
				}
				this.uploadService
					.getFileUrl(record.id, 'users', 'avatar', '200x200')
					.then((url) => {
						this.avatarUrl = url
					})
				this.loader.complete()
				return true
			}
			this.loader.stop()
			return false
		})
	}
}
