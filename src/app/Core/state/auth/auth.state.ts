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
	id: string | null
	token: string | null
	isAuthenticated: boolean
}

// Define the default state
const defaults: AuthStateModel = {
	id: null,
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
	static getId(state: AuthStateModel): string | null {
		return state.id
	}

	// Actions
	@Action(Login)
	login(ctx: StateContext<AuthStateModel>, action: Login) {
		const record = action.payload.record.record
		ctx.patchState({
			id: record.id,
			token: action.payload.record.token,
			isAuthenticated: true,
		})
	}

	@Action(Logout)
	logout(ctx: StateContext<AuthStateModel>) {
		ctx.setState(defaults)
	}
}
