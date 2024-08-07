import { Injectable } from '@angular/core'
import { ClientResponseError } from 'pocketbase'

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	constructor() {}

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
}
