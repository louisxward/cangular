import { Injectable } from '@angular/core'
import { Action, Selector, State, StateContext } from '@ngxs/store'
import { RecordAuthResponse } from 'pocketbase'
import { RoleGroup } from '../role/role'

// Define actions
export class Login {
	static readonly type = '[Auth] Login'
	constructor(public payload: { record: RecordAuthResponse }) {}
}

export class Logout {
	static readonly type = '[Auth] Logout'
}

export class UpdateRoleGroups {
	static readonly type = '[Auth] Update Role Groups'
	constructor(public payload: { record: RoleGroup[] }) {}
}

// Define the state model
export interface AuthStateModel {
	id: string | null
	token: string | null
	isAuthenticated: boolean
	roleGroups: RoleGroup[]
}

// Define the default state
const defaults: AuthStateModel = {
	id: null,
	token: null,
	isAuthenticated: false,
	roleGroups: [],
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

	@Selector()
	static getRoleGroups(state: AuthStateModel): RoleGroup[] {
		return state.roleGroups
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

	@Action(UpdateRoleGroups)
	updateRoleGroups(ctx: StateContext<AuthStateModel>, action: UpdateRoleGroups) {
		ctx.patchState({
			roleGroups: action.payload.record,
		})
	}
}
