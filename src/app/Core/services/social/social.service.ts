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

	async checkFollowing(userId: string, followUserId: string) {
		const params: { [key: string]: any } = {}
		params['user'] = userId
		params['follows_user'] = followUserId
		const filter = this.pb.filter(
			'user = {:user} && follows_user = {:follows_user}',
			params
		)
		return this.pb
			.collection('user_follows')
			.getFirstListItem(filter)
			.then((e) => {
				return e.id
			})
			.catch(() => {
				return null
			})
	}
}
