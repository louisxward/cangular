import { Injectable } from '@angular/core'
import PocketBase from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { RoleGroup } from '../../state/role/role'
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

	// ToDo - Can be removed. only need the rolegroup not the whole record
	async getUserRoleGroups(userId: string): Promise<UserRoleGroup[]> {
		//this.loadingBarService.start()
		const filter: string = 'user = "' + userId + '"'
		return await this.pb
			.collection('user_role_groups')
			.getFullList<UserRoleGroup>({ filter: filter })
			.then((e) => {
				this.loadingBarService.complete()
				return e
			})
			.catch((error) => {
				console.error(error)
				//this.loadingBarService.error()
				return []
			})
	}

	async getRoleGroups(userId: string): Promise<RoleGroup[]> {
		const roleGroups: RoleGroup[] = []
		await this.getUserRoleGroups(userId).then((e) => {
			for (let userRoleGroup of e) {
				roleGroups.push(userRoleGroup.roleGroup)
			}
		})
		return roleGroups
	}
}
