import { Injectable } from '@angular/core'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { User, UserList, UserPassword } from '../../state/user/user'
import { ErrorService } from '../error/error.service'
import { LoadingBarService } from '../loading-bar/loading-bar.service'

@Injectable()
export class UserService {
	pb: PocketBase
	collection: string = 'users'

	constructor(
		apiService: ApiService,
		private errorService: ErrorService,
		private loadingBarService: LoadingBarService
	) {
		this.pb = apiService.pb
	}

	async createUser(user: User) {
		this.loadingBarService.start()
		try {
			return await this.pb
				.collection(this.collection)
				.create<User>(user)
				.then((e) => {
					this.loadingBarService.complete()
					return e
				})
		} catch (error) {
			console.error(error)
			this.loadingBarService.error()
			return null
		}
	}

	async createUserPassword(user: UserPassword) {
		this.loadingBarService.start()
		return await this.pb
			.collection(this.collection)
			.create(user)
			.then(() => {
				this.loadingBarService.complete()
				return new Boolean(true)
			})
			.catch((error) => {
				console.error(error)
				this.loadingBarService.error()
				if (error instanceof ClientResponseError) {
					return this.errorService.parseError(error)
				}
				return []
			})
	}

	async updateUser(user: User, userId: string) {
		this.loadingBarService.start()
		return await this.pb
			.collection(this.collection)
			.update<User>(userId, user)
			.then(() => {
				this.loadingBarService.error()
				return new Boolean(true) // Not sure why this needs to be done. Dont think passing either value back is a good idea
			})
			.catch((error) => {
				console.error(error)
				this.loadingBarService.error()
				if (error instanceof ClientResponseError) {
					return this.errorService.parseError(error)
				}
				return []
			})
	}

	async getUser(id: string) {
		this.loadingBarService.start()
		try {
			return await this.pb
				.collection(this.collection)
				.getOne<User>(id, {})
				.then((e) => {
					this.loadingBarService.complete()
					return e
				})
		} catch (error) {
			console.error(error)
			this.loadingBarService.error()
			return null
		}
	}

	async getResults(page: number, max: number, filter: string, sort: string) {
		this.loadingBarService.start()
		console.info('UserService.getResults()')
		console.info(
			'query: {' +
				'page: ' +
				page +
				' ' +
				', max: ' +
				max +
				' ' +
				', filter: "' +
				filter +
				'" ' +
				', sort: "' +
				sort +
				'"}'
		)
		try {
			return await this.pb
				.collection(this.collection)
				.getList<UserList>(page, max, { filter: filter, sort: sort })
				.then((e) => {
					this.loadingBarService.complete()
					return e
				})
		} catch (error) {
			console.error(error)
			this.loadingBarService.error()
			return null
		}
	}
}
