// auth.guard.ts
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthState } from 'src/app/Core/state/auth/auth.state'

@Injectable({
	providedIn: 'root',
})

// For Routes atm
export class AuthGuardService implements CanActivate {
	constructor(
		private store: Store,
		private router: Router
	) {}

	canActivate(): Observable<boolean> {
		return this.store.select(AuthState.isAuthenticated).pipe(
			map((isAuthenticated) => {
				if (!isAuthenticated) {
					this.router.navigate(['/login'])
				}
				return isAuthenticated
			})
		)
	}
}
