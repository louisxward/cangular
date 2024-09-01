import { Component, OnInit } from '@angular/core'
import { Store } from '@ngxs/store'
import PocketBase from 'pocketbase'
import { filter, firstValueFrom, map, Observable } from 'rxjs'
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
	username$: Observable<string>
	email$: Observable<string | null>
	avatarUrl$: Observable<string | null>

	loaded = false

	constructor(
		private store: Store,
		private loginService: LoginService
	) {}

	async ngOnInit(): Promise<void> {
		const userId$ = this.store.select(AuthState.getId).pipe(
			filter((e) => e !== null),
			map((e) => e as string)
		)
		await firstValueFrom(userId$).then((e) => {
			this.userId = e
		})
		this.username$ = this.store.select(UserState.getUsername).pipe(
			filter((e) => e !== null),
			map((e) => e as string)
		)
		this.email$ = this.store.select(UserState.getEmail)
		this.avatarUrl$ = this.store.select(UserState.getAvatarUrl)
		this.loaded = true
	}

	logout(): void {
		this.loginService.logout(false)
	}
}
