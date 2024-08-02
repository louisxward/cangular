import { Component } from '@angular/core'
import { PageHeaderComponent } from '../../Core/components/page-header/page-header.component'
import { LoginFormComponent } from '../../Login/components/login-form/login-form.component'
import { Store } from '@ngxs/store'
import { AuthState } from 'src/app/Core/state/index'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	isLoggedIn$ = this.store.select(AuthState.isAuthenticated)

	constructor(private store: Store) {}
}
