import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngxs/store'
import { AuthState } from 'src/app/Core/state/index'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	constructor(
		private store: Store,
		private router: Router
	) {}

	ngOnInit(): void {
		this.redirect()
	}

	redirect() {
		this.store
			.select(AuthState.isAuthenticated)
			.subscribe((e) => {
				if (e) {
					this.router.navigate(['/profile'])
				}
			})
			.unsubscribe()
	}
}
