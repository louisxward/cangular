import { Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Store } from '@ngxs/store'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { ApiService } from 'src/app/Core/services/api/api.service'

export class User {
	//ToDo - switched this to a class. Not sure why or what will happen. 'https://stackoverflow.com/questions/12789231/class-type-check-in-typescript'
	id: string
	username: string
	email: string | null
	lastLoggedIn: string | null
}

export interface UserInt {
	//ToDo - switched this to a class. Not sure why or what will happen. 'https://stackoverflow.com/questions/12789231/class-type-check-in-typescript'
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

	constructor(private store: Store, private apiService: ApiService) {
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
		try {
			return await this.pb.collection('users').create<User>(user)
		} catch (error) {
			console.error(error)
			if (error instanceof ClientResponseError) {
				return this.parseError(error)
			}
			return []
		}
	}

	// ToDo - Move to helper
	parseError(error: ClientResponseError): string[] {
		const response: string[] = []
		switch (error.status) {
			case 403:
				response.push(error.message)
				break
			case 400:
				this.parse400(error, response)
				break
		}
		return response
	}

	parse400(error: ClientResponseError, respone: string[]) {
		for (const [key] of Object.entries(error.data.data)) {
			respone.push('{' + key + '}') // ToDo - Not sure on this method atm for saying if value is key or not
		}
	}

	async saveUser(user: User) {
		try {
			return await this.pb.collection('users').update<User>(user.id, user)
		} catch (error) {
			console.error(error)
			return null
		}
	}

	partialUser(init?: Partial<User>) {
		// ToDo - Not sure about this
		return Object.assign(User, init)
	}

	async getUser(id: string) {
		try {
			return await this.pb.collection('users').getOne<User>(id, {})
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async getResults(page: number, max: number, filter: string) {
		try {
			return await this.pb
				.collection('users')
				.getList<UserList>(page, max, { filter: filter })
		} catch (error) {
			console.error(error)
			return null
		}
	}
}
