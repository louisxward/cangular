import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { environment } from 'src/environment/environment'
import { ApiService } from 'src/app/Core/services/api/api.service'

@Injectable()
export class SocialService {
	pb: PocketBase

	constructor(
		private store: Store,
		private apiService: ApiService
	) {
		this.pb = apiService.pb
	}

	async follow(userId: string, followUserId: string) {
		let temp = null
		const myPromise = this.pb
			.collection('user_follows')
			.create({ user: userId, follows_user: followUserId })
		await myPromise
			.then((value) => {
				temp = value.id
			})
			.catch((error) => {
				console.log(error)
			})
		return temp
	}

	// ToDo - Good place to start with returning nulls instead of errors.
	async unfollow(followingId: string) {
		const myPromise = this.pb.collection('user_follows').delete(followingId)
		let temp = null
		await myPromise
			.then(() => {
				return null
			})
			.catch((error) => {
				console.log(error)
				temp = followingId
			})
		return temp
	}

	async checkFollowing(userId: string, followUserId: string | null) {
		let temp = null
		if (!followUserId) return followUserId
		const query = "user='"
			.concat(userId + "' && follows_user='")
			.concat(followUserId + "'")
		const myPromise = this.pb
			.collection('user_follows')
			.getFirstListItem(query, {})
		await myPromise
			.then((value) => {
				temp = value.id
			})
			.catch((error: 404) => {})
		return temp
	}

	async checkMutuals(aId: string, bId: string) {
		await this.checkFollowing(aId, bId)

		return false
	}
}
