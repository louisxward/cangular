import { ApplicationRef, Component, isDevMode } from '@angular/core'
import { Store } from '@ngxs/store'
import { first } from 'rxjs/operators'
import { AuthCheckService } from './Core/services/auth/auth-check.service'
import { AuthInactivityService } from './Core/services/auth/auth-inactivity.service'
import { User } from './Core/state/'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'cangular'

	constructor(
		private store: Store,
		private appRef: ApplicationRef,
		private authCheckService: AuthCheckService, // Both are in use
		private authInactivityService: AuthInactivityService
	) {
		isDevMode()
			? console.info('AppMode: DEVELOPMENT')
			: console.info('AppMode: PRODUCTION')
		console.info('AppVersion: ', require('../../package.json').version)
		this.appRef.isStable.pipe(first((stable) => stable)).subscribe(() => {
			this.store.dispatch(new User.AppLoaded())
		})
	}
}
