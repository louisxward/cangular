// auth.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { RecordAuthResponse } from 'pocketbase'

// Define actions
export class Login {
	static readonly type = '[Auth] Login'
	constructor(public payload: { record: RecordAuthResponse }) {}
}

export class Logout {
	static readonly type = '[Auth] Logout'
}

// Define the state model
export interface AuthStateModel {
	username: string | null
	token: string | null
	isAuthenticated: boolean
}

// Define the default state
const defaults: AuthStateModel = {
	username: null,
	token: null,
	isAuthenticated: false,
}

@State<AuthStateModel>({
	name: 'auth',
	defaults,
})
@Injectable()
export class AuthState {
	// Selectors
	@Selector()
	static isAuthenticated(state: AuthStateModel): boolean {
		return state.isAuthenticated
	}

	@Selector()
	static username(state: AuthStateModel): string | null {
		return state.username
	}

	// Actions
	@Action(Login)
	login(ctx: StateContext<AuthStateModel>, action: Login) {
		const record = action.payload.record.record
		ctx.patchState({
			username: record.username,
			token: action.payload.record.token,
			isAuthenticated: true,
		})
	}

	@Action(Logout)
	logout(ctx: StateContext<AuthStateModel>) {
		ctx.patchState({
			username: null,
			token: null,
			isAuthenticated: false,
		})
	}
}
