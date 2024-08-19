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
