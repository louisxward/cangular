import { Injectable } from '@angular/core'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { UserRoleGroup } from '../../state/user/user'
import { LoadingBarService } from '../loading-bar/loading-bar.service'

@Injectable()
export class RoleService {
	pb: PocketBase

	constructor(
		apiService: ApiService,
		private loadingBarService: LoadingBarService
	) {
		this.pb = apiService.pb
	}

	async getUserRoleGroups(userId: string): Promise<UserRoleGroup[]> {
		this.loadingBarService.start()
		return await this.pb
			.collection('UserRoleGroup')
			.getFullList<UserRoleGroup>({ filter: '' })
			.then((e) => {
				this.loadingBarService.complete()
				return e
			})
			.catch((error) => {
				console.error(error)
				this.loadingBarService.error()
				return []
			})
	}
}
