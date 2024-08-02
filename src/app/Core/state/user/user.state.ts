import { Injectable } from '@angular/core'
import { UserStateModel } from './user.model'
import { State, Action, StateContext, Store, Selector } from '@ngxs/store'
import { User } from './user.actions'
import PocketBase from 'pocketbase'
import { Router } from '@angular/router'
import { UploadService } from '../../services/upload/upload.service'
import { ApiService } from 'src/app/Core/services/api/api.service'

const userStateDefaults: UserStateModel = {
	avatarUrl: null,
	avatarFileName: null,
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
	pb: PocketBase

	constructor(
		private store: Store,
		private router: Router,
		private uploadService: UploadService,
		private apiService: ApiService
	) {
		this.pb = apiService.pb
	}

	// Actions
	@Action(User.Login.Login)
	login(ctx: StateContext<UserStateModel>, action: User.Login.Login) {
		const record = action.payload.record
		this.store.dispatch(
			new User.Update.User({
				id: record.id,
				avatar: record.avatar,
				username: record.username,
				email: record.email,
			})
		)
	}

	@Action(User.Login.Logout)
	logout(ctx: StateContext<UserStateModel>) {
		ctx.setState(userStateDefaults)
	}

	@Action(User.Update.User)
	async updateUser(ctx: StateContext<UserStateModel>, action: User.Update.User) {
		const id = action.payload.id
		const avatarFileName = action.payload.avatar
		const username = action.payload.username
		const email = action.payload.email
		let avatarUrl = ''
		if (avatarFileName) {
			await this.uploadService
				.getFileUrl(id, avatarFileName, null)
				.then((value: string) => (avatarUrl = value))
		}
		ctx.patchState({
			avatarUrl: avatarUrl,
			username: username,
			email: email,
			avatarFileName: avatarFileName,
		})
	}

	@Action(User.Update.Avatar)
	async updateAvatar(
		ctx: StateContext<UserStateModel>,
		action: User.Update.Avatar
	) {
		const id = action.payload.id
		const fileName = action.payload.fileName
		let avatarUrl = ''
		if (fileName != '') {
			await this.uploadService
				.getFileUrl(id, fileName, null)
				.then((value: string) => (avatarUrl = value))
		} else {
			this.uploadService.deleteFile(id, fileName, 'avatar')
		}
		ctx.patchState({
			avatarUrl: avatarUrl,
			avatarFileName: fileName,
		})
	}

	@Action(User.Update.Sidebar)
	updateSidebarState(ctx: StateContext<UserStateModel>) {
		ctx.patchState({
			sidebarExpanded: !ctx.getState().sidebarExpanded,
		})
	}

	// Secelectors

	@Selector()
	static getAvatarUrl(state: UserStateModel): string | null {
		return state.avatarUrl
	}

	@Selector()
	static getAvatarFileName(state: UserStateModel): string | null {
		return state.avatarFileName
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
