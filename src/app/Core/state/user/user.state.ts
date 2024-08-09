import { Injectable } from '@angular/core'
import { Action, Selector, State, StateContext } from '@ngxs/store'
import { User } from './user.actions'
import { UserStateModel } from './user.model'

const userStateDefaults: UserStateModel = {
	avatarUrl: null,
	smallAvatarUrl: null,
	username: null,
	email: null,
	sidebarExpanded: false,
}

@State<UserStateModel>({
	name: 'user',
	defaults: userStateDefaults,
})
@Injectable()
export class UserState {
	// Actions
	@Action(User.Login.Login)
	login(ctx: StateContext<UserStateModel>, action: User.Login.Login) {
		ctx.patchState({
			avatarUrl: action.payload.avatarUrl,
			smallAvatarUrl: action.payload.smallAvatarUrl,
			username: action.payload.record.username,
			email: action.payload.record.email,
		})
	}

	@Action(User.Login.Logout)
	logout(ctx: StateContext<UserStateModel>) {
		ctx.setState(userStateDefaults)
	}

	@Action(User.Update.Avatar)
	async updateAvatar(
		ctx: StateContext<UserStateModel>,
		action: User.Update.Avatar
	) {
		ctx.patchState({
			avatarUrl: action.payload.avatarUrl,
			smallAvatarUrl: action.payload.smallAvatarUrl,
		})
	}

	@Action(User.Update.Sidebar)
	updateSidebarState(ctx: StateContext<UserStateModel>) {
		ctx.patchState({
			sidebarExpanded: !ctx.getState().sidebarExpanded,
		})
	}

	// Selectors
	@Selector()
	static getAvatarUrl(state: UserStateModel): string | null {
		return state.avatarUrl
	}
	// Selectors
	@Selector()
	static getSmallAvatarUrl(state: UserStateModel): string | null {
		return state.smallAvatarUrl
	}

	@Selector()
	static getUsername(state: UserStateModel): string | null {
		return state.username
	}

	@Selector()
	static getEmail(state: UserStateModel): string | null {
		return state.email
	}

	@Selector()
	static getSidebarExpanded(state: UserStateModel): boolean {
		return state.sidebarExpanded
	}
}
