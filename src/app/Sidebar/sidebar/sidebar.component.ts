import { Component } from '@angular/core'
import { Store } from '@ngxs/store'
import { User, UserState, AuthState } from 'src/app/Core/state/index'

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	isLoggedIn$ = this.store.select(AuthState.isAuthenticated)
	avatarUrl$ = this.store.select(UserState.getSmallAvatarUrl)
	username$ = this.store.select(UserState.getUsername)
	email$ = this.store.select(UserState.getEmail)
	sidebarExpanded$ = this.store.select(UserState.getSidebarExpanded)

	constructor(private store: Store) {}

	updateSidebarState() {
		this.store.dispatch(new User.Update.Sidebar())
	}
}
