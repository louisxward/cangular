import { Injectable } from '@angular/core'
import { LoadingBarService } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { User, UserList, UserPassword } from '../../state/user/user'
import { ErrorService } from '../error/error.service'

@Injectable()
export class UserService {
	pb: PocketBase
	loader: LoadingBarState
	collection: string = 'users'

	constructor(
		private apiService: ApiService,
		private errorService: ErrorService,
		private loadingBarService: LoadingBarService
	) {
		this.pb = apiService.pb
		this.loader = this.loadingBarService.useRef()
	}

	async createUser(user: User) {
		this.loader.start()
		try {
			return await this.pb
				.collection(this.collection)
				.create<User>(user)
				.then((e) => {
					this.loader.complete()
					return e
				})
		} catch (error) {
			console.error(error)
			this.loader.stop()
			return null
		}
	}

	async createUserPassword(user: UserPassword) {
		this.loader.start()
		return await this.pb
			.collection(this.collection)
			.create(user)
			.then(() => {
				this.loader.complete()
				return new Boolean(true)
			})
			.catch((error) => {
				console.error(error)
				this.loader.stop()
				if (error instanceof ClientResponseError) {
					return this.errorService.parseError(error)
				}
				return []
			})
	}

	async updateUser(user: User, userId: string) {
		this.loader.start()
		return await this.pb
			.collection(this.collection)
			.update<User>(userId, user)
			.then(() => {
				this.loader.complete()
				return new Boolean(true) // ToDo - Hmm - Not sure why this needs to be done. Dont think passing either value back is a good idea
			})
			.catch((error) => {
				console.error(error)
				this.loader.stop()
				if (error instanceof ClientResponseError) {
					return this.errorService.parseError(error)
				}
				return []
			})
	}

	async getUser(id: string) {
		this.loader.start()
		try {
			return await this.pb
				.collection(this.collection)
				.getOne<User>(id, {})
				.then((e) => {
					this.loader.complete()
					return e
				})
		} catch (error) {
			console.error(error)
			this.loader.stop()
			return null
		}
	}

	async getResults(page: number, max: number, filter: string, sort: string) {
		this.loader.start()
		console.info('UserService.getResults()')
		console.info(
			'query: "' +
				'page: ' +
				page +
				' ' +
				'max: ' +
				max +
				' ' +
				'filter: ' +
				filter +
				' ' +
				'sort: ' +
				sort +
				'"'
		)
		try {
			return await this.pb
				.collection(this.collection)
				.getList<UserList>(page, max, { filter: filter, sort: sort })
				.then((e) => {
					this.loader.complete()
					return e
				})
		} catch (error) {
			console.error(error)
			this.loader.stop()
			return null
		}
	}
}
