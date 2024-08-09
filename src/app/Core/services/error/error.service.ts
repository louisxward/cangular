import { Injectable } from '@angular/core'
import { ClientResponseError } from 'pocketbase'

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	responseKeys: Map<string, string>

	constructor() {
		this.responseKeys = new Map<string, string>()
		this.responseKeys.set('passwordConfirm', 'Passwords dont match')
		this.responseKeys.set('username', 'Username is in use')
		this.responseKeys.set('email', 'Email is in use')
	}

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

	getResponseKeyValue(key: string): string {
		return this.responseKeys.get(key) ?? '???' + key + '???'
	}

	parse400(error: ClientResponseError, responses: string[]) {
		for (const [key] of Object.entries(error.data.data)) {
			responses.push(this.getResponseKeyValue(key))
		}
	}
}
