import { ApplicationRef, Component, isDevMode } from '@angular/core'
import { Store } from '@ngxs/store'
import { first } from 'rxjs/operators'
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
		private appRef: ApplicationRef
	) {
		isDevMode()
			? console.info('AppMode: DEVELOPMENT')
			: console.info('AppMode: PRODUCTION')
		this.appRef.isStable.pipe(first((stable) => stable)).subscribe(() => {
			this.store.dispatch(new User.AppLoaded())
		})
	}
}
