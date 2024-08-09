import { ClientResponseError } from 'pocketbase'

export interface ErrorRespose {
	errorKey: string | null
	formKey: string[]
	response: string | null
}

export class ErrorService {
	errorResponses: ErrorRespose[] = [
		{
			errorKey: 'passwordConfirm',
			formKey: ['password', 'passwordConfirm'],
			response: 'Passwords dont match',
		},
		{
			errorKey: 'username',
			formKey: ['username'],
			response: 'Username is in use',
		},
		{ errorKey: 'email', formKey: ['email'], response: 'Email is in use' },
	]

	constructor() {}

	parseError(error: ClientResponseError): ErrorRespose[] {
		const responses: ErrorRespose[] = []
		switch (error.status) {
			case 403:
				responses.push({
					errorKey: null,
					formKey: [],
					response: error.message,
				})
				break
			case 400:
				this.parse400(error, responses)
				break
		}
		return responses
	}

	getResponse(errorKey: string): ErrorRespose {
		return (
			this.errorResponses.find((e) => e.errorKey === errorKey) ?? {
				errorKey: errorKey,
				formKey: [],
				response: '???' + errorKey + '???',
			}
		)
	}

	parse400(error: ClientResponseError, responses: ErrorRespose[]) {
		for (const [key] of Object.entries(error.data.data)) {
			responses.push(this.getResponse(key))
		}
	}
}
