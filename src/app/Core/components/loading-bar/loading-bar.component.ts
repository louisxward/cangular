import { Component } from '@angular/core'
import { LoadingBarService } from '../../services/loading-bar/loading-bar.service'

@Component({
	selector: 'app-loading-bar',
	templateUrl: './loading-bar.component.html',
	styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent {
	colour: string
	constructor(private loadingBarService: LoadingBarService) {
		this.loadingBarService.onColourChange().subscribe((e) => (this.colour = e))
	}
}
