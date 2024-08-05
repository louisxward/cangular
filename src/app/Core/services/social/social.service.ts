import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'

@Injectable()
export class SocialService {
	pb: PocketBase

	constructor(private store: Store, private apiService: ApiService) {
		this.pb = apiService.pb
	}

	async follow(userId: string, followUserId: string) {
		return this.pb
			.collection('user_follows')
			.create({ user: userId, follows_user: followUserId })
			.then((value) => {
				return value.id
			})
			.catch((error) => {
				console.error(error)
				return null
			})
	}

	async unfollow(followingId: string) {
		return this.pb
			.collection('user_follows')
			.delete(followingId)
			.then(() => {
				return null
			})
			.catch((error) => {
				console.error(error)
				return followingId
			})
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
}
