import { Component } from '@angular/core'

@Component({
	selector: 'app-loading-bar',
	templateUrl: './loading-bar.component.html',
	styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent {
	defaultColour: string = '#FFFF00'
	errorColour: string = '#FF0000'
	colour: string
	constructor() {
		this.colour = this.defaultColour
	}
}
