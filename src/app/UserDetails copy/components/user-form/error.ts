export interface Error {
	passwordConfirm: {
		code: string
		message: string
	}
	username: {
		code: string
		message: string
	}
	email: {
		code: string
		message: string
	}
}

export interface ErrorContainer {
	code: string
	message: string
	data: Error // in reality just a JSON string containing serialized Items in an Array
}

export interface User {
	username: string
	email: string
}
