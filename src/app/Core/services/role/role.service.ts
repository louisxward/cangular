import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { firstValueFrom } from 'rxjs'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { AuthState } from '../../state/auth/auth.state'
import { RoleGroup } from '../../state/role/role'
import { UserRoleGroup } from '../../state/user/user'
import { LoadingBarService } from '../loading-bar/loading-bar.service'

@Injectable()
export class RoleService {
	pb: PocketBase

	constructor(
		apiService: ApiService,
		private loadingBarService: LoadingBarService,
		private store: Store
	) {
		this.pb = apiService.pb
	}

	async hasRoleGroup(roleGroup: RoleGroup): Promise<boolean> {
		console.log('hasRoleGroup()2')
		return await firstValueFrom(this.store.select(AuthState.getRoleGroups))
			.then((e) => {
				for (let userRoleGroup of e) {
					if (userRoleGroup == roleGroup) {
						return true
					}
				}
				return false
			})
			.catch((error) => {
				console.error(error)
				return false
			})
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
