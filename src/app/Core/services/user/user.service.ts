import { Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'
import { ErrorService } from '../error/error.service'

export interface User {
	//ToDo - Read 'https://stackoverflow.com/questions/12789231/class-type-check-in-typescript'
	id: string
	username: string
	email: string | null
	lastLoggedIn: string | null
}

export interface UserPassword {
	username: string
	email: string
	emailVisibility: boolean
	password: string
	passwordConfirm: string
}

export interface UserList {
	id: string
	username: string
	email: string | null
}

export interface UserListSearch {
	id: FormControl<string | null>
	username: FormControl<string | null>
}

@Injectable()
export class UserService {
	pb: PocketBase

	constructor(apiService: ApiService, private errorService: ErrorService) {
		this.pb = apiService.pb
	}

	async createUser(user: User) {
		try {
			return await this.pb.collection('users').create<User>(user)
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async createUserPassword(user: UserPassword) {
		return await this.pb
			.collection('users')
			.create(user)
			.then(() => {
				return new Boolean(true)
			})
			.catch((error) => {
				console.error(error)
				if (error instanceof ClientResponseError) {
					return this.errorService.parseError(error)
				}
				return []
			})
	}

	async updateUser(user: User, userId: string) {
		return await this.pb
			.collection('users')
			.update<User>(userId, user)
			.then(() => {
				return new Boolean(true) // ToDo - Hmm - Not sure why this needs to be done. Dont think passing either value back is a good idea
			})
			.catch((error) => {
				console.error(error)
				if (error instanceof ClientResponseError) {
					return this.errorService.parseError(error)
				}
				return []
			})
	}

	async getUser(id: string) {
		try {
			return await this.pb.collection('users').getOne<User>(id, {})
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async getResults(page: number, max: number, filter: string, sort: string) {
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
				.collection('users')
				.getList<UserList>(page, max, { filter: filter, sort: sort })
		} catch (error) {
			console.error(error)
			return null
		}
	}
}
