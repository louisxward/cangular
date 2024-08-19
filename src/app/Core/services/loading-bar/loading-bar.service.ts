import { Injectable } from '@angular/core'
import { LoadingBarService as Base } from '@ngx-loading-bar/core'
import { LoadingBarState } from '@ngx-loading-bar/core/loading-bar.state'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

@Injectable()
export class LoadingBarService {
	loader: LoadingBarState
	defaultColour: string = '#FFFF00'
	errorColour: string = '#FF0000'
	colour: BehaviorSubject<string>

	constructor(base: Base) {
		this.colour = new BehaviorSubject<string>(this.defaultColour)
		this.loader = base.useRef()
	}

	onColourChange() {
		return this.colour.asObservable()
	}

	start() {
		this.colour.next(this.defaultColour)
		this.loader.start()
	}

	error() {
		this.colour.next(this.errorColour)
		this.loader.stop()
	}

	complete() {
		this.colour.next(this.defaultColour)
		this.loader.complete()
	}
}
