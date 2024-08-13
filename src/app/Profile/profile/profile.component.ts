import { Component, OnInit } from '@angular/core'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { filter, firstValueFrom, map } from 'rxjs'
import { LoginService } from 'src/app/Core/services/login/login.service'
import { AuthState, UserState } from 'src/app/Core/state/index'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	pb: PocketBase

	userId: string
	avatarUrl: string | null
	username: string
	email: string | null

	loaded = false

	constructor(private store: Store, private loginService: LoginService) {}

	async ngOnInit(): Promise<void> {
		const userId$ = this.store.select(AuthState.getId).pipe(
			filter((e) => e !== null),
			map((e) => e as string)
		)
		const avatarUrl$ = this.store.select(UserState.getAvatarUrl)
		const username$ = this.store.select(UserState.getUsername).pipe(
			filter((e) => e !== null),
			map((e) => e as string)
		)
		const email$ = this.store.select(UserState.getEmail)
		await firstValueFrom(userId$).then((e) => {
			this.userId = e
		})
		await firstValueFrom(avatarUrl$).then((e) => {
			this.avatarUrl = e
		})
		await firstValueFrom(username$).then((e) => {
			this.username = e
		})
		await firstValueFrom(email$).then((e) => {
			this.email = e
		})
		this.loaded = true
	}
	logout(): void {
		this.loginService.logout(false)
	}
}
